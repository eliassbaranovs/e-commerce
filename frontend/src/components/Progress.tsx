"use client";

import React from "react";

interface ProgressProps {
  progress: number;
  orientation?: "horizontal" | "vertical";
}

export function Progress({ progress, orientation = "horizontal" }: ProgressProps) {
  if (orientation === "horizontal") {
    return (
      <div className="w-full bg-white rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-2 bg-white rounded-full">
      <div
        className="bg-blue-500 w-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}