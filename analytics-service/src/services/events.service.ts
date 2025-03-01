import fs from 'fs';
import path from 'path';
import { AnalyticsEvent, EventsData } from '../types';

// Private variables (module scope)
const dataDir = path.join(__dirname, "../../data");
const eventsFile = path.join(dataDir, "events.json");
let eventBuffer: AnalyticsEvent[] = [];
const bufferSize = 20;
const flushInterval = 5000; // 5 seconds
let flushTimer: NodeJS.Timeout | null = null;

// Initialize data directory and files
const initialize = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(eventsFile)) {
    fs.writeFileSync(eventsFile, JSON.stringify({ events: [] }));
  }

  // Set up flush interval
  flushTimer = setInterval(flushBuffer, flushInterval);
};

// Private helper functions
const readEvents = (): EventsData => {
  const data = fs.readFileSync(eventsFile, "utf8");
  return JSON.parse(data);
};

const writeEvents = (events: EventsData): void => {
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
};

const flushBuffer = (): void => {
  if (eventBuffer.length === 0) return;

  const data = readEvents();
  data.events.push(...eventBuffer);
  writeEvents(data);

  // Clear buffer
  eventBuffer = [];
};

// Public API functions
export const getEvents = (): EventsData => {
  return readEvents();
};

export const getEventsByType = (type: string): AnalyticsEvent[] => {
  const data = readEvents();
  return data.events.filter((event) => event.type === type);
};

export const addEvent = (event: AnalyticsEvent): void => {
  eventBuffer.push(event);

  // Flush if buffer exceeds size
  if (eventBuffer.length >= bufferSize) {
    flushBuffer();
  }
};

export const addBatchEvents = (events: AnalyticsEvent[]): void => {
  eventBuffer.push(...events);

  // Flush if buffer exceeds size
  if (eventBuffer.length >= bufferSize) {
    flushBuffer();
  }
};

export const shutdown = (): void => {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  
  // Flush any remaining events in the buffer
  flushBuffer();
};

// Initialize on module load
initialize();
