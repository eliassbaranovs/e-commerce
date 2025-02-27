import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="px-6 py-10">
      <Image
        src="/images/Logo.png"
        alt="Hackmotion logo"
        className="hidden md:block"
        width={150}
        height={50}
      />
      <div className="mx-auto text-center md:grid md:items-center md:grid-cols-2 md:gap-8 md:p-8">
        <div className="text-left md:order-1">
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900">
            We have put together a swing improvement solution to help you{" "}
            <span className="text-[#5772ff]">break 80</span>
          </h1>

          <div className="mt-4">
            <p>Pack includes:</p>
            <ul className="border-l-4 border-blue-500 pl-3 mt-2 space-y-2 text-gray-700">
              <li>
                <strong>Swing Analyzer- HackMotion Core</strong>
              </li>
              <li>
                <strong>Drills by coach Tyler Ferrell</strong>
              </li>
              <li>
                <strong>Game improvement plan by HackMotion</strong>
              </li>
            </ul>
            {/* Button */}
            <button className="mt-6 px-6 py-2 bg-[#5772ff] text-white rounded-3xl font-semibold flex items-center justify-center md:justify-start">
              Start Now →
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:mt-0 md:order-2">
          <Image
            src="/images/Improvement-Graph.png"
            alt="Graph showing improvement"
            width={500}
            height={300}
            className="mx-auto"
          />
          <div className="md:hidden">
            <Image
              src="/images/Improvement-Progress-bar.png"
              alt="Progress card"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="md:hidden">
            <Image
              src="/images/Frame-4151178.png"
              alt="Rating card"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/Frame-4151179.png"
              alt="Rating and progress card"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
