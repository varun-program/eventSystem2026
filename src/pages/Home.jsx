import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="
      relative
      min-h-[85vh] md:min-h-[90vh]
      flex items-center justify-center
      px-5 md:px-6
      overflow-hidden
    ">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow opacity-70 md:opacity-100"></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>

      {/* CONTENT */}
      <div className="
        relative z-10
        w-full max-w-3xl
        text-center
        animate-fadeIn
      ">
        {/* College Name */}
        <h2 className="
          text-red-500
          text-[10px] md:text-sm
          tracking-[0.2em] md:tracking-[0.35em]
          mb-3
          glow-text
        ">
          V.S.B COLLEGE OF ENGINEERING TECHNICAL CAMPUS
        </h2>

        {/* Department */}
        <p className="
          text-gray-400
          text-xs md:text-sm
          mb-8 md:mb-10
          tracking-wide md:tracking-widest
        ">
          Department of Information Technology & AIML
        </p>

        {/* Event Name */}
        <h1 className="
          text-4xl sm:text-5xl md:text-7xl
          font-bold
          text-red-600
          mb-5 md:mb-6
          tracking-[0.15em] md:tracking-[0.25em]
          glow-text
          md:glitch
        ">
          BLITZMAC&apos;26
        </h1>

        {/* Tagline */}
        <p className="
          text-gray-300
          text-sm md:text-base
          mb-10 md:mb-14
          max-w-md md:max-w-xl
          mx-auto
          leading-relaxed
        ">
          Enter the Upside Down of Talent & Innovation
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/events")}
          className="
            w-full sm:w-auto
            px-8 md:px-12
            py-3 md:py-4
            border border-red-600
            text-red-500
            text-sm md:text-base
            tracking-[0.15em] md:tracking-[0.3em]
            md:hover:bg-red-600 md:hover:text-black
            md:hover:shadow-[0_0_40px_red]
            transition duration-300
          "
        >
          ENTER THE UPSIDE DOWN
        </button>
      </div>

      {/* Bottom fade */}
      <div className="
        absolute bottom-0 left-0 w-full h-24 md:h-32
        bg-gradient-to-t from-black to-transparent
      "></div>
    </section>
  );
}

export default Home;
