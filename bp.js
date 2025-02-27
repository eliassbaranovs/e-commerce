// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// type DrillType = "static" | "dynamic" | "fullswing" | null;

// const CoachingClient = () => {
//   const [openDrill, setOpenDrill] = useState<DrillType>("static");
//   const [contentHeights, setContentHeights] = useState<Record<string, number>>({
//     static: 0,
//     dynamic: 0,
//     fullswing: 0,
//   });

//   const staticRef = useRef<HTMLDivElement>(null);
//   const dynamicRef = useRef<HTMLDivElement>(null);
//   const fullswingRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Measure content heights
//     if (staticRef.current) {
//       setContentHeights((prev) => ({
//         ...prev,
//         static: staticRef.current?.scrollHeight || 0,
//       }));
//     }
//     if (dynamicRef.current) {
//       setContentHeights((prev) => ({
//         ...prev,
//         dynamic: dynamicRef.current?.scrollHeight || 0,
//       }));
//     }
//     if (fullswingRef.current) {
//       setContentHeights((prev) => ({
//         ...prev,
//         fullswing: fullswingRef.current?.scrollHeight || 0,
//       }));
//     }
//   }, []);

//   const toggleDrill = (drill: DrillType): void => {
//     setOpenDrill(openDrill === drill ? null : drill);
//   };

//   return (
//     <>
//       {/* Static Top Drill Section */}
//       <div className="border-t border-gray-200 py-4">
//         <div
//           className="flex items-center cursor-pointer"
//           onClick={() => toggleDrill("static")}
//         >
//           {openDrill === "static" ? (
//             <ChevronUp className="text-blue-500 mr-2" size={24} />
//           ) : (
//             <ChevronDown className="text-blue-500 mr-2" size={24} />
//           )}
//           <h2 className="text-2xl text-blue-500 font-medium">
//             Static top drill
//           </h2>
//         </div>

//         <div
//           className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
//           style={{
//             maxHeight:
//               openDrill === "static" ? `${contentHeights.static}px` : "0px",
//             opacity: openDrill === "static" ? 1 : 0,
//           }}
//         >
//           <div ref={staticRef} className="pl-8 text-gray-800">
//             <p>
//               Get a feel for the optimal wrist position at Top of your swing
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Dynamic Top Drill Section */}
//       <div className="border-t border-gray-200 py-4">
//         <div
//           className="flex items-center cursor-pointer"
//           onClick={() => toggleDrill("dynamic")}
//         >
//           {openDrill === "dynamic" ? (
//             <ChevronUp className="text-blue-500 mr-2" size={24} />
//           ) : (
//             <ChevronDown className="text-blue-500 mr-2" size={24} />
//           )}
//           <h2 className="text-2xl text-blue-500 font-medium">
//             Dynamic top drill
//           </h2>
//         </div>

//         <div
//           className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
//           style={{
//             maxHeight:
//               openDrill === "dynamic" ? `${contentHeights.dynamic}px` : "0px",
//             opacity: openDrill === "dynamic" ? 1 : 0,
//           }}
//         >
//           <div ref={dynamicRef} className="pl-8 text-gray-800">
//             <p>Practice the correct wrist position during your backswing</p>
//           </div>
//         </div>
//       </div>

//       {/* Top Full Swing Challenge Section */}
//       <div className="border-t border-gray-200 py-4">
//         <div
//           className="flex items-center cursor-pointer"
//           onClick={() => toggleDrill("fullswing")}
//         >
//           {openDrill === "fullswing" ? (
//             <ChevronUp className="text-blue-500 mr-2" size={24} />
//           ) : (
//             <ChevronDown className="text-blue-500 mr-2" size={24} />
//           )}
//           <h2 className="text-2xl text-blue-500 font-medium">
//             Top full swing challenge
//           </h2>
//         </div>

//         <div
//           className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
//           style={{
//             maxHeight:
//               openDrill === "fullswing"
//                 ? `${contentHeights.fullswing}px`
//                 : "0px",
//             opacity: openDrill === "fullswing" ? 1 : 0,
//           }}
//         >
//           <div ref={fullswingRef} className="pl-8 text-gray-800">
//             <p>Practice the full swing with the correct wrist position</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CoachingClient;
