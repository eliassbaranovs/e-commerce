import HeroSection from "@/components/HeroSection";
import Coaching from "@/components/Coaching";
import Footer from "@/components/Footer";

// Define the valid goal options
export type GolfGoal = "Break Par" | "Break 80" | "Break 90" | "Break 100";

export default async function Home({
  searchParams,
}: {
  searchParams: { goal?: string };
}) {
  // Default to 'Break 80' if no goal parameter or invalid value
  let goal: GolfGoal = "Break 80";

  try {
    // Get the search params value safely
    const params = await searchParams || {};
    const goalParam = params.goal;

    // Validate and set the goal from URL parameter
    if (goalParam) {
      const validGoals: GolfGoal[] = [
        "Break Par",
        "Break 80",
        "Break 90",
        "Break 100",
      ];

      const formattedGoal = goalParam
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      if (validGoals.includes(formattedGoal as GolfGoal)) {
        goal = formattedGoal as GolfGoal;
      }
    }
  } catch (error) {
    console.error("Error processing search parameters:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#e6e6e6]">
      <div className="max-w-7xl mx-auto w-full">
        <HeroSection goal={goal} />
        <main className="flex-grow">
          <Coaching />
        </main>
      </div>
      <Footer />
    </div>
  );
}