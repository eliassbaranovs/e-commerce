import { NextRequest, NextResponse } from "next/server";

const ANALYTICS_SERVICE_URL =
  process.env.ANALYTICS_SERVICE_URL || "http://localhost:3001";

export async function POST(req: NextRequest) {
  try {
    const { events } = await req.json();

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: "Events array is required" },
        { status: 400 }
      );
    }

    console.log(`Processing batch of ${events.length} analytics events`);

    // Process each event and collect promises
    const promises = events.map(async (event) => {
      const { type, data, timestamp } = event;

      // Prepare the payload based on the event type
      let payload;
      switch (type) {
        case "page_view":
          payload = {
            type: "page_view",
            userId: data.userId,
            url: req.headers.get("referer") || req.nextUrl.href,
            metadata: {
              userAgent: req.headers.get("user-agent") || "",
              referer: req.headers.get("referer") || "",
              timestamp: timestamp,
            },
          };
          break;
        case "video_start":
          payload = {
            type: "video_start",
            userId: data.userId,
            url: req.headers.get("referer") || req.nextUrl.href,
            metadata: {
              videoId: data.videoId,
              duration: data.duration,
              currentTime: data.currentTime,
              timestamp: timestamp,
            },
          };
          break;
        case "video_pause":
          payload = {
            type: "video_pause",
            userId: data.userId,
            url: req.headers.get("referer") || req.nextUrl.href,
            metadata: {
              videoId: data.videoId,
              duration: data.duration,
              currentTime: data.currentTime,
              timestamp: timestamp,
            },
          };
          break;
        case "video_complete":
          payload = {
            type: "video_complete",
            userId: data.userId,
            url: req.headers.get("referer") || req.nextUrl.href,
            metadata: {
              videoId: data.videoId,
              duration: data.duration,
              watchTime: data.watchTime,
              completed: data.completed,
              timestamp: timestamp,
            },
          };
          break;
        default:
          return null; // Skip unknown events
      }

      // Send to analytics service
      try {
        const response = await fetch(`${ANALYTICS_SERVICE_URL}/api/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        return await response.json();
      } catch (error) {
        console.error(`Error processing ${type} event:`, error);
        return null;
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.allSettled(promises);

    // Count successes and failures
    const successful = results.filter(
      (result) => result.status === "fulfilled" && result.value !== null
    ).length;
    const failed = results.filter(
      (result) => result.status === "rejected" || result.value === null
    ).length;

    return NextResponse.json({
      success: true,
      processed: successful,
      failed,
      total: events.length,
    });
  } catch (error) {
    console.error("Error processing batch analytics:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process batch analytics" },
      { status: 500 }
    );
  }
}
