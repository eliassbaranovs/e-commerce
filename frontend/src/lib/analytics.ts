

const isBrowser = typeof window !== "undefined";

type AnalyticsEventType =
  | "video_start"
  | "video_pause"
  | "video_complete"
  | "page_view";

// Event buffer storage
let eventBuffer: {
  type: AnalyticsEventType;
  data: Record<string, string | number | boolean>;
  timestamp: string;
}[] = [];
let flushInterval: NodeJS.Timeout | null = null;
let isSending = false;
const bufferTimeMs = 2000; // Flush every 2 seconds
const maxBufferSize = 10; // Or flush when buffer reaches this size

// Start the flush interval when the module is first imported
const startFlushInterval = () => {
  if (!isBrowser) return; // Don't run on server

  if (flushInterval === null) {
    flushInterval = setInterval(() => flush(), bufferTimeMs);
  }
};

// Stop the flush interval
const stopFlushInterval = () => {
  if (flushInterval !== null) {
    clearInterval(flushInterval);
    flushInterval = null;
  }
};

// Add an event to the buffer
const track = (
  type: AnalyticsEventType,
  data: Record<string, string | number | boolean>
) => {
  // Check for consent before tracking
  if (typeof window !== "undefined") {
    const consentGiven = window.document.cookie
      .split("; ")
      .find((row) => row.startsWith("consent_given="))
      ?.split("=")[1];

    // Only track if consent is explicitly given
    if (consentGiven !== "true") {
      console.log("[Analytics] Tracking skipped - no consent given");
      return;
    }
  }

  // Use a simplified event structure for the buffer
  const event = {
    type,
    data,
    timestamp: new Date().toISOString(),
  };

  eventBuffer.push(event);
  console.log(
    `[Analytics] Event ${type} queued. Buffer size: ${eventBuffer.length}`
  );

  // If the buffer exceeds the max size, flush immediately
  if (eventBuffer.length >= maxBufferSize) {
    flush();
  }
};

// Flush all events in the buffer
const flush = async () => {
  if (!isBrowser || eventBuffer.length === 0 || isSending) return;

  isSending = true;
  const eventsToSend = [...eventBuffer];
  eventBuffer = [];

  try {
    console.log(`[Analytics] Flushing ${eventsToSend.length} events`);

    // Send events in batch
    const response = await fetch("/api/analytics/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: eventsToSend }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send analytics: ${response.status}`);
    }

    const result = await response.json();
    console.log("[Analytics] Events sent successfully:", result);
  } catch (error) {
    console.error("[Analytics] Failed to send events:", error);
    // Put events back in the buffer for retry
    eventBuffer = [...eventsToSend, ...eventBuffer];
  } finally {
    isSending = false;
  }
};

// Call this method when the user is about to leave the page
const flushBeforeUnload = () => {
  if (!isBrowser || eventBuffer.length === 0) return;

  // Use synchronous XHR for beforeunload event
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/analytics/batch", false); // Synchronous
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ events: eventBuffer }));
    eventBuffer = [];
  } catch (error) {
    console.error("[Analytics] Failed to send events before unload:", error);
  }
};

// Initialize the module
startFlushInterval();

// Clean up function for when components unmount or the app closes
const cleanup = () => {
  if (!isBrowser) return;

  if (eventBuffer.length > 0) {
    flush();
  }
  stopFlushInterval();
};

// Convenience trackers for specific event types
const trackPageView = (userId: string): void => {
  track("page_view", { userId });
};

const trackVideoStart = (data: {
  videoId: string;
  duration: number;
  currentTime: number;
  userId?: string;
}) => {
  track("video_start", data);
};

const trackVideoPause = (data: {
  videoId: string;
  duration: number;
  currentTime: number;
  userId?: string;
}) => {
  track("video_pause", data);
};

const trackVideoComplete = (data: {
  videoId: string;
  duration: number;
  watchTime: number;
  completed: boolean;
  userId?: string;
}) => {
  track("video_complete", data);
};

// Export the functions
export const analytics = {
  track,
  flush,
  flushBeforeUnload,
  cleanup,
  trackPageView,
  trackVideoStart,
  trackVideoPause,
  trackVideoComplete,
};
