export interface AnalyticsEvent {
  id: string;
  type: string;
  userId: string;
  timestamp: string;
  url?: string;
  metadata?: Record<string, any>;
  ip?: string;
}

export interface EventsData {
  events: AnalyticsEvent[];
}