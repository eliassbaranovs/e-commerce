export interface VideoContextType {
  currentDrill: string | null;
  setCurrentDrill: (drill: string | null) => void;
  seekTo: (time: number) => void;
  videoRef: React.RefObject<HTMLVideoElement> | null;
  setVideoRef: (ref: React.RefObject<HTMLVideoElement>) => void;
}

export interface VideoPlayerHookResult {
  progress: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  seekTo: (time: number) => void;
}