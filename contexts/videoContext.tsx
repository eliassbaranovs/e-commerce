"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type DrillType = "static" | "dynamic" | "fullswing" | null;

interface VideoContextType {
  currentDrill: DrillType;
  setCurrentDrill: (drill: DrillType) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [currentDrill, setCurrentDrill] = useState<DrillType>("static");

  return (
    <VideoContext.Provider value={{ currentDrill, setCurrentDrill }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
