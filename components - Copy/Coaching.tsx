"use client";
import CoachingClient from "./CoachingClient";
import ProgressBar from "./ProgressBar";
import { VideoProvider } from "../contexts/videoContext";

const Coaching = () => {
  return (
    <section className="px-6 py-10 flex flex-col">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-500 mb-6">
        The best solution for you: Impact Training Program
      </h1>
      <div className="flex justify-center my-6">
        <hr className="w-full border-t border-gray-300" />
      </div>
      <VideoProvider>
        <div className="flex flex-col lg:flex-row w-full">
          <ProgressBar videoSrc="/videos/Impact-Drill.mp4" />

          <div className="w-full lg:w-[35%] p-2">
            <CoachingClient />
          </div>
        </div>
      </VideoProvider>
    </section>
  );
};

export default Coaching;
