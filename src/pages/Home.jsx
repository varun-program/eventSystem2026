import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 hero-glow"></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Container */}
      <div className="
        relative z-10
        w-full max-w-4xl
        text-center
        animate-fadeIn
      ">

        {/* College Name */}
        <h2 className="
          text-red-500
          tracking-[0.35em]
          text-xs md:text-sm
          mb-4
          glow-text
        ">
          V.S.B COLLEGE OF ENGINEERING TECHNICAL CAMPUS
        </h2>

        {/* Department */}
        <p className="text-gray-400 mb-10 tracking-widest text-sm">
          Department of Information Technology & AIML
        </p>

        {/* Event Name */}
        <h1 className="
          text-5xl md:text-7xl
          font-bold
          text-red-600
          mb-6
          tracking-[0.25em]
          glow-text glitch
        ">
          BLITZMAC&apos;26
        </h1>

        {/* Tagline */}
        <p className="
          text-gray-300
          mb-14
          max-w-xl
          mx-auto
          tracking-wide
        ">
          Enter the Upside Down of Talent & Innovation
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/events")}
          className="
            px-12 py-4
            border border-red-600
            text-red-500
            tracking-[0.3em]
            hover:bg-red-600 hover:text-black
            hover:shadow-[0_0_40px_red]
            transition duration-300
          "
        >
          ENTER THE UPSIDE DOWN
        </button>
      </div>

      {/* Bottom fade */}
      <div className="
        absolute bottom-0 left-0 w-full h-32
        bg-gradient-to-t from-black to-transparent
      "></div>

    </section>
  );
}

export default Home;
