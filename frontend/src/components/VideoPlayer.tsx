"use client";

import React, { useRef } from "react";
import { useVideoPlayer } from "../hooks/useVideo";

interface VideoPlayerProps {
  videoSrc: string;
  videoType?: string;
  videoId?: string;
  onProgressChange?: (progress: number) => void;
}

const VideoPlayer = ({
  videoSrc,
  videoType = "video/mp4",
  videoId = "impact-drill",
  onProgressChange,
}: VideoPlayerProps) => {
  // Fix: Use non-null assertion to tell TypeScript this will be assigned a value
  const videoRef = useRef<HTMLVideoElement>(null);
  const { progress } = useVideoPlayer(videoRef, videoId);

  // Call the progress change callback whenever progress updates
  React.useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [progress, onProgressChange]);

  return (
    <div className="w-full">
      <video className="w-full" controls ref={videoRef}>
        <source src={videoSrc} type={videoType} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
