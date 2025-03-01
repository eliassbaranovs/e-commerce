"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useVideoContext } from "../contexts/videoContext";
import { useAnalytics } from "./useAnalytics";
import { VideoPlayerHookResult } from "@/types";

// Update the function signature to accept potentially null refs
export function useVideoPlayer(
  videoRef: RefObject<HTMLVideoElement | null>,
  videoId: string = "impact-drill"
): VideoPlayerHookResult {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);
  const { setCurrentDrill, setVideoRef } = useVideoContext();
  const { trackVideoComplete, trackVideoStart, trackVideoPause } =
    useAnalytics();
  const videoCompletedRecently = useRef(false);

  // Register the video ref with context
  useEffect(() => {
    setVideoRef(videoRef);
  }, [setVideoRef, videoRef]);

  // Set up all video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      setCurrentTime(currentTime);
      setDuration(video.duration);
      const percentage = (currentTime / video.duration) * 100;
      setProgress(percentage);

      // Detect when video restarts
      if (previousTime > 5 && currentTime < 1) {
        setCurrentDrill("static");
      }
      setPreviousTime(currentTime);

      // Update current drill based on timestamp
      if (currentTime >= 24) {
        setCurrentDrill("fullswing");
      } else if (currentTime >= 14) {
        setCurrentDrill("dynamic");
      } else if (currentTime >= 5) {
        setCurrentDrill("static");
      }
    };

    const handleVideoEnded = () => {
      videoCompletedRecently.current = true;
      trackVideoComplete({
        videoId,
        duration: video.duration,
        watchTime: video.currentTime,
        completed: true,
      });

      setTimeout(() => {
        videoCompletedRecently.current = false;
      }, 500);
    };

    const handleVideoPlay = () => {
      trackVideoStart({
        videoId,
        duration: video.duration,
        currentTime: video.currentTime,
      });
    };

    const handleVideoPause = () => {
      const isVideoEnded =
        video.ended || video.currentTime >= video.duration - 0.5;

      if (videoCompletedRecently.current || isVideoEnded) {
        console.log("[Analytics] Skipping pause tracking because video ended");
        return;
      }

      trackVideoPause({
        videoId,
        duration: video.duration,
        currentTime: video.currentTime,
      });
    };

    const handleSeeking = () => {
      const currentTime = video.currentTime;
      if (currentTime < 5) {
        setCurrentDrill("static");
      } else if (currentTime < 14) {
        setCurrentDrill("dynamic");
      } else {
        setCurrentDrill("fullswing");
      }
    };

    // Add event listeners
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleVideoEnded);
    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("pause", handleVideoPause);
    video.addEventListener("seeking", handleSeeking);

    // Clean up
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleVideoEnded);
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("pause", handleVideoPause);
      video.removeEventListener("seeking", handleSeeking);
    };
  }, [
    videoRef,
    setCurrentDrill,
    previousTime,
    trackVideoComplete,
    trackVideoStart,
    trackVideoPause,
    videoId,
  ]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return {
    progress,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seekTo,
  };
}
