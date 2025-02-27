import CoachingClient from "./CoachingClient";

// This is a Server Component
const Coaching = () => {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto text-center md:grid md:items-center md:grid-cols-2 md:gap-8 md:p-8">
        <h1 className="text-4xl font-semibold text-blue-500 mb-6 col-span-2 text-left">
          The best solution for you: Impact Training Program
        </h1>

        {/* Video Content */}
        <div className="mb-8 md:mb-0 md:order-1">
          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <video
                controls
                className="absolute inset-0 w-full h-full object-cover"
                poster="/images/video-thumbnail-dynamic.jpg"
              >
                <source src="/videos/Impact-Drill.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="text-left md:order-2">
          <div className="w-full bg-white rounded-full h-2 mb-6">
            <div className="bg-blue-500 h-2 rounded-full w-1/8"></div>
          </div>

          {/* Client component for interactive parts */}
          <CoachingClient />
        </div>
      </div>
    </section>
  );
};

export default Coaching;
