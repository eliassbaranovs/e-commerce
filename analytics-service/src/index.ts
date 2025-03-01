import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import eventsRoutes from "./routes/events.routes";
import * as eventService from "./services/events.service";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/events", eventsRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Dashboard route
app.get("/dashboard", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Analytics service running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    eventService.shutdown();
  });
});
