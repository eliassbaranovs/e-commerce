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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const { setCurrentDrill } = useVideoContext();
  const [previousTime, setPreviousTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const percentage = (currentTime / video.duration) * 100;
      setProgress(percentage);

      // Detect when video restarts (when current time goes from a higher value to near zero)
      if (previousTime > 5 && currentTime < 1) {
        // Video has been restarted
        setCurrentDrill("static");
      }
      setPreviousTime(currentTime);

      // Change active drill based on timestamps
      if (currentTime >= 24) {
        setCurrentDrill("fullswing");
      } else if (currentTime >= 14) {
        setCurrentDrill("dynamic");
      } else if (currentTime >= 5) {
        setCurrentDrill("static");
      }
    };

    // Update progress as the video plays
    video.addEventListener("timeupdate", updateProgress);

    // Also detect the seeking event, which happens when user jumps to a position
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
