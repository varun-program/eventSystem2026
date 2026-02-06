import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Events() {
  const [technicalEvents, setTechnicalEvents] = useState([]);
  const [nonTechnicalEvents, setNonTechnicalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const allEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (!mounted) return;

      setTechnicalEvents(allEvents.filter(e => e.category === "technical"));
      setNonTechnicalEvents(allEvents.filter(e => e.category === "non-technical"));
      setLoading(false);
    };

    fetchEvents();
    return () => (mounted = false);
  }, []);

  if (loading) return <Loader />;

  /* ================= TECHNICAL CARD ================= */
  const TechnicalCard = ({ event }) => {
    const hasPrize =
      typeof event.prizeAmount === "number" && event.prizeAmount > 0;

    return (
      <div
        className="
          border border-red-700 rounded-xl
          p-5 md:p-6
          bg-black/80
          transition md:hover:-translate-y-2
          md:hover:shadow-[0_0_40px_red]
        "
      >
        <h3 className="text-red-500 text-base md:text-lg tracking-wide md:tracking-widest mb-2">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {event.description}
        </p>

        {hasPrize ? (
          <p className="text-yellow-400 font-semibold mb-4 text-sm">
            🏆 Prize Pool: ₹{event.prizeAmount}
          </p>
        ) : (
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-wide border border-blue-500 text-blue-400 rounded-full">
            WORKSHOP
          </span>
        )}

        <button
          onClick={() => navigate("/register", { state: { event } })}
          className="
            w-full py-2.5
            border border-red-600
            text-red-500 text-sm
            tracking-wide md:tracking-widest
            md:hover:bg-red-600 md:hover:text-black
            transition
          "
        >
          REGISTER
        </button>
      </div>
    );
  };

  /* ================= NON-TECH CARD (FIXED) ================= */
  const NonTechnicalCard = ({ event }) => (
    <div
      className="
        relative overflow-hidden
        border border-purple-700 rounded-xl
        bg-black/70 p-5
        transition-all duration-300
        md:hover:-translate-y-2
        md:hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]
        group
      "
    >
      {/* TOP NEON STRIP */}
      <div
        className="
          absolute top-0 left-0 w-full h-[2px]
          bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500
          opacity-70 md:group-hover:opacity-100
          transition
        "
      />

      <span
        className="
          inline-block mb-3 px-3 py-1
          text-xs tracking-wide
          border border-purple-500
          text-purple-400 rounded-full
          bg-purple-600/10
        "
      >
        NON-TECHNICAL
      </span>

      <h3 className="text-purple-400 text-base md:text-lg tracking-wide md:tracking-widest mb-2">
        {event.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {event.description}
      </p>

      {/* INNER GLOW */}
      <div
        className="
          absolute inset-0 pointer-events-none
          opacity-0 md:group-hover:opacity-100
          transition
          shadow-[inset_0_0_60px_rgba(168,85,247,0.15)]
        "
      />
    </div>
  );

  return (
    <section className="min-h-screen px-5 md:px-16 py-20 md:py-24">
      {/* HEADER */}
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-3xl md:text-5xl text-red-600 tracking-[0.15em] md:tracking-[0.3em] glow-text mb-4">
          EVENTS
        </h1>
        <p className="text-gray-400 text-sm tracking-wide">
          Choose your challenge from the Upside Down
        </p>
      </div>

      {/* TECHNICAL */}
      <div className="mb-24 md:mb-32">
        <h2 className="text-red-500 text-2xl md:text-3xl tracking-wide md:tracking-[0.25em] mb-10 text-center">
          TECHNICAL EVENTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {technicalEvents.map(event => (
            <TechnicalCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* NON-TECH */}
      <div>
        <h2 className="text-purple-400 text-2xl md:text-3xl tracking-wide md:tracking-[0.25em] mb-10 text-center">
          NON-TECHNICAL EVENTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {nonTechnicalEvents.map(event => (
            <NonTechnicalCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
