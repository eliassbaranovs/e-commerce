"use client";
import { useRef, useState, useEffect } from "react";
import { useVideoContext } from "../contexts/videoContext";

interface ProgressBarProps {
  videoSrc: string;
  videoType?: string;
}

const ProgressBar = ({
  videoSrc,
  videoType = "video/mp4",
}: ProgressBarProps) => {
  const videoRef = useRef<HTMLVideoElement>(null) as React.MutableRefObject<HTMLVideoElement>;
  const [progress, setProgress] = useState(0);
  const { setCurrentDrill, setVideoRef } = useVideoContext(); // Removed seekTo here
  const [previousTime, setPreviousTime] = useState(0);

  // Register the videoRef in the VideoContext – do it once
  useEffect(() => {
    setVideoRef(videoRef);
  }, [setVideoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const percentage = (currentTime / video.duration) * 100;
      setProgress(percentage);

      // Detect when video restarts (time reset)
      if (previousTime > 5 && currentTime < 1) {
        setCurrentDrill("static");
      }
      setPreviousTime(currentTime);

      // Automatically set drill based on current time.
      if (currentTime >= 24) {
        setCurrentDrill("fullswing");
      } else if (currentTime >= 14) {
        setCurrentDrill("dynamic");
      } else if (currentTime >= 5) {
        setCurrentDrill("static");
      }
    };

    video.addEventListener("timeupdate", updateProgress);

    video.addEventListener("seeking", () => {
      const currentTime = video.currentTime;
      if (currentTime < 5) {
        setCurrentDrill("static");
      } else if (currentTime < 14) {
        setCurrentDrill("dynamic");
      } else {
        setCurrentDrill("fullswing");
      }
    });

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("seeking", () => {});
    };
  }, [setCurrentDrill, previousTime]);

  return (
    <>
      {/* Video Content */}
      <div className="w-full lg:w-[60%] p-2">
        <video className="w-full" controls ref={videoRef}>
          <source src={videoSrc} type={videoType} />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-full lg:w-[5%] p-2 flex justify-center lg:justify-start">
        {/* Mobile and tablet: horizontal progress bar */}
        <div className="w-full bg-white rounded-full h-2 mb-6 lg:hidden">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Desktop: vertical progress bar */}
        <div className="hidden lg:block h-full w-2 bg-white rounded-full">
          <div
            className="bg-blue-500 w-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ height: `${progress}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
