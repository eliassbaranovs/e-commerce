export interface ProgressProps {
  progress: number;
  orientation?: "horizontal" | "vertical";
}

export interface ProgressBarProps {
  videoSrc: string;
  videoType?: string;
  videoId?: string;
}

export interface HeroSectionProps {
  goal: GolfGoal;
}

export type GolfGoal = "Break Par" | "Break 80" | "Break 90" | "Break 100";