"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useVideoContext } from "../contexts/videoContext";

type DrillType = "static" | "dynamic" | "fullswing" | null;

interface DrillInfo {
  id: DrillType;
  title: string;
  description: string;
}

const drills: DrillInfo[] = [
  {
    id: "static",
    title: "Static top drill",
    description:
      "Get a feel for the optimal wrist position at Top of your swing",
  },
  {
    id: "dynamic",
    title: "Dynamic top drill",
    description: "Practice the correct wrist position during your backswing",
  },
  {
    id: "fullswing",
    title: "Top full swing challenge",
    description: "Practice the full swing with the correct wrist position",
  },
];

const CoachingClient = () => {
  const { currentDrill, setCurrentDrill } = useVideoContext();

  const toggleDrill = (drill: DrillType): void => {
    setCurrentDrill(currentDrill === drill ? null : drill);
  };

  return (
    <>
      {drills.map((drill) => (
        <div
          key={drill.id}
          className={`border-t border-gray-200 py-4 ${
            currentDrill === drill.id ? "bg-blue-50 rounded-lg" : ""
          }`}
        >
          {/* Drill Header */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleDrill(drill.id)}
          >
            {currentDrill === drill.id ? (
              <ChevronUp className="text-blue-500 mr-2" size={24} />
            ) : (
              <ChevronDown className="text-blue-500 mr-2" size={24} />
            )}
            <h2 className="text-2xl text-blue-500 font-medium">
              {drill.title}
            </h2>
          </div>

          {/* Drill Content */}
          <div
            className={`mt-2 pl-8 overflow-hidden transition-all duration-300 ease-in-out ${
              currentDrill === drill.id
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-gray-800">
              <p className="text-sm md:text-base lg:text-lg">
                {drill.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CoachingClient;
