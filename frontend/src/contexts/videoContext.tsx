"use client";

import React, { createContext, useState, useContext, ReactNode, RefObject } from "react";

type DrillType = "static" | "dynamic" | "fullswing" | null;

interface VideoContextType {
  currentDrill: DrillType;
  setCurrentDrill: (drill: DrillType) => void;
  videoRef: RefObject<HTMLVideoElement | null> | null;
  setVideoRef: (ref: RefObject<HTMLVideoElement | null>) => void;
  seekTo: (time: number) => void;
}

// Create context with proper typing
const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [currentDrill, setCurrentDrill] = useState<DrillType>("static");
  const [videoRef, setVideoRef] = useState<RefObject<HTMLVideoElement | null> | null>(null);
  
  const seekTo = (time: number) => {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  
  return (
    <VideoContext.Provider 
      value={{ 
        currentDrill, 
        setCurrentDrill, 
        seekTo,
        videoRef,
        setVideoRef 
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
