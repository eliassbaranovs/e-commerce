"use client";

import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { Progress } from "./Progress";

interface VideoSectionProps {
  videoSrc: string;
  videoType?: string;
  videoId?: string;
}

const VideoSection = ({
  videoSrc,
  videoType = "video/mp4",
  videoId = "impact-drill",
}: VideoSectionProps) => {
  const [progress, setProgress] = useState(0);

  return (
    <>
      {/* Video Content - EXACT ORIGINAL STYLING */}
      <div className="w-full lg:w-[60%] p-2">
        <VideoPlayer
          videoSrc={videoSrc}
          videoType={videoType}
          videoId={videoId}
          onProgressChange={setProgress}
        />
      </div>

      <div className="w-full lg:w-[5%] p-2 flex justify-center lg:justify-start">
        {/* Mobile and tablet: horizontal progress bar */}
        <div className="lg:hidden w-full">
          <Progress progress={progress} orientation="horizontal" />
        </div>

        {/* Desktop: vertical progress bar */}
        <div className="hidden lg:block h-full">
          <Progress progress={progress} orientation="vertical" />
        </div>
      </div>
    </>
  );
};

export default VideoSection;
