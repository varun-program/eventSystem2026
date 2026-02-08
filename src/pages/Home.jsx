import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();

  /* ================= COUNTDOWN ================= */
  const eventDate = new Date("2026-02-19T09:00:00"); // Feb 19, 9 AM
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({});
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
        relative min-h-[85vh] md:min-h-[90vh]
        flex items-center justify-center
        px-5 md:px-6 overflow-hidden
      "
    >
      {/* GLOW + OVERLAY */}
      <div className="absolute inset-0 hero-glow opacity-70 md:opacity-100"></div>
      <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-3xl text-center animate-fadeIn">

        {/* COLLEGE */}
        <h2 className="
          text-red-500 text-[10px] md:text-sm
          tracking-[0.2em] md:tracking-[0.35em]
          mb-3 glow-text
        ">
          V.S.B COLLEGE OF ENGINEERING TECHNICAL CAMPUS
        </h2>

        <p className="
          text-gray-400 text-xs md:text-sm
          mb-6 tracking-wide md:tracking-widest
        ">
          Department of IT & CSE (AI & ML)
        </p>

        {/* EVENT NAME */}
        <h1 className="
          text-4xl sm:text-5xl md:text-7xl
          font-bold text-red-600
          mb-4 tracking-[0.15em] md:tracking-[0.25em]
          glow-text md:glitch
        ">
          BLITZMAC&apos;26
        </h1>

        <p className="
          text-gray-300 text-sm md:text-base
          mb-8 max-w-xl mx-auto
        ">
          Enter the Upside Down of Talent & Innovation
        </p>

        {/* ================= COUNTDOWN ================= */}
        {timeLeft.days !== undefined && (
          <div className="mb-10">
            <p className="text-xs tracking-widest text-gray-400 mb-4">
              EVENT STARTS IN
            </p>

            <div className="
              flex justify-center gap-3 md:gap-6
              text-red-500
            ">
              {Object.entries(timeLeft).map(([key, value]) => (
                <div
                  key={key}
                  className="
                    bg-black/70 border border-red-700
                    px-4 py-3 md:px-6 md:py-4
                    rounded-lg
                    shadow-[0_0_20px_rgba(255,0,0,0.25)]
                    animate-pulseSlow
                  "
                >
                  <p className="text-xl md:text-3xl font-bold">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="text-[10px] md:text-xs tracking-widest text-gray-400 uppercase">
                    {key}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs tracking-widest text-yellow-400">
              📅 FEBRUARY 19, 2026
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate("/events")}
          className="
            w-full sm:w-auto
            px-8 md:px-12 py-3 md:py-4
            border border-red-600
            text-red-500
            tracking-[0.15em] md:tracking-[0.3em]
            md:hover:bg-red-600 md:hover:text-black
            md:hover:shadow-[0_0_40px_red]
            transition
          "
        >
          ENTER THE UPSIDE DOWN
        </button>
      </div>

      {/* BOTTOM FADE */}
      <div className="
        absolute bottom-0 left-0 w-full h-24 md:h-32
        bg-gradient-to-t from-black to-transparent
      " />
    </section>
  );
}

export default Home;
