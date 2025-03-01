export type PageViewEvent = {
  type: 'page_view';
  userId: string;
  path?: string;
  url?: string;
  timestamp: string;
  metadata?: {
    userAgent?: string;
    referer?: string;
    screenSize?: string;
    language?: string;
  };
}

export type VideoStartEvent = {
  type: 'video_start';
  userId: string;
  videoId: string;
  duration: number;
  currentTime: number;
  timestamp: string;
  metadata?: {
    playerType?: string;
    videoQuality?: string;
    playbackRate?: number;
  };
}

export type VideoPauseEvent = {
  type: 'video_pause';
  userId: string;
  videoId: string;
  duration: number;
  currentTime: number;
  timestamp: string;
  metadata?: {
    pauseReason?: 'user_initiated' | 'auto_paused' | 'buffer' | 'unknown';
    totalPauseCount?: number;
  };
}

export type VideoCompleteEvent = {
  type: 'video_complete';
  userId: string;
  videoId: string;
  duration: number;
  watchTime: number;
  completed: boolean;
  timestamp: string;
  metadata?: {
    skippedSections?: { start: number; end: number }[];
    replayCount?: number;
  };
}

export type ErrorEvent = {
  type: 'error';
  userId: string;
  errorCode?: string;
  errorMessage: string;
  source: 'video' | 'page' | 'network' | 'other';
  timestamp: string;
  metadata?: {
    [key: string]: string | number | boolean | object | undefined;
  };
}

export type ClickEvent = {
  type: 'click';
  userId: string;
  elementId?: string;
  elementType?: string;
  elementText?: string;
  timestamp: string;
  metadata?: {
    position?: { x: number; y: number };
    isCallToAction?: boolean;
  };
}

export type FormSubmissionEvent = {
  type: 'form_submission';
  userId: string;
  formId: string;
  success: boolean;
  timestamp: string;
  metadata?: {
    formFields?: string[];
    validationErrors?: string[];
    submissionTime?: number; // Time spent filling the form in ms
  };
}

export type AnalyticsEvent = 
  | PageViewEvent
  | VideoStartEvent
  | VideoPauseEvent
  | VideoCompleteEvent
  | ErrorEvent
  | ClickEvent
  | FormSubmissionEvent;

export interface AnalyticsConfig {
  bufferSize?: number;
  flushInterval?: number;
  endpoint?: string;
  debug?: boolean;
  useBeacon?: boolean;
  anonymizeIp?: boolean;
}