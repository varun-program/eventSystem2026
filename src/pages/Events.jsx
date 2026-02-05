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

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loader />;

  /* =========================
     TECHNICAL EVENT CARD
     ========================= */
  const TechnicalCard = ({ event }) => {
    const hasPrize =
      typeof event.prizeAmount === "number" && event.prizeAmount > 0;

    return (
      <div
        className="
          relative border border-red-700 rounded-xl
          p-6 bg-black/80
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-[0_0_40px_red]
        "
      >
        <h3 className="text-red-500 tracking-widest mb-3">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {event.description}
        </p>

        {/* PRIZE / WORKSHOP */}
        {hasPrize ? (
          <p className="text-yellow-400 font-semibold mb-4">
            🏆 Prize Pool: ₹{event.prizeAmount}
          </p>
        ) : (
          <span
            className="
              inline-block mb-4 px-3 py-1
              text-xs tracking-widest
              border border-blue-500
              text-blue-400
              rounded-full
            "
          >
            WORKSHOP 
          </span>
        )}

        <button
          onClick={() => navigate("/register", { state: { event } })}
          className="
            w-full mt-4 py-2
            border border-red-600
            text-red-500 tracking-widest
            hover:bg-red-600 hover:text-black
            hover:shadow-[0_0_25px_red]
            transition
          "
        >
          REGISTER
        </button>
      </div>
    );
  };

  /* =========================
     NON-TECHNICAL EVENT CARD
     ========================= */
  const NonTechnicalCard = ({ event }) => (
    <div
      className="
        relative overflow-hidden
        border border-purple-700 rounded-xl
        bg-black/70 p-6
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
        group
      "
    >
      {/* TOP NEON STRIP */}
      <div
        className="
          absolute top-0 left-0 w-full h-[3px]
          bg-gradient-to-r
          from-purple-500 via-fuchsia-500 to-purple-500
          opacity-70
          group-hover:opacity-100
          transition
        "
      />

      <span
        className="
          inline-block mb-4 px-4 py-1
          text-xs tracking-widest
          border border-purple-500
          text-purple-400
          rounded-full
          bg-purple-600/10
        "
      >
        NON-TECHNICAL
      </span>

      <h3 className="text-purple-400 tracking-widest text-lg mb-3">
        {event.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {event.description}
      </p>

      {/* INNER GLOW */}
      <div
        className="
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          transition
          pointer-events-none
          shadow-[inset_0_0_60px_rgba(168,85,247,0.15)]
        "
      />
    </div>
  );

  return (
    <section className="min-h-screen px-6 md:px-16 py-24">

      {/* HEADER */}
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl text-red-600 tracking-[0.3em] glow-text mb-6">
          EVENTS
        </h1>
        <p className="text-gray-400 tracking-widest text-sm">
          Choose your challenge from the Upside Down
        </p>
      </div>

      {/* TECHNICAL EVENTS */}
      <div className="mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.25em] mb-14 text-center">
          TECHNICAL EVENTS
        </h2>

        {technicalEvents.length === 0 ? (
          <p className="text-center text-gray-500">
            No technical events available
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {technicalEvents.map(event => (
              <TechnicalCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* NON-TECHNICAL EVENTS */}
      <div>
        <h2 className="text-purple-400 text-3xl tracking-[0.25em] mb-14 text-center">
          NON-TECHNICAL EVENTS
        </h2>

        {nonTechnicalEvents.length === 0 ? (
          <p className="text-center text-gray-500">
            No non-technical events available
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {nonTechnicalEvents.map(event => (
              <NonTechnicalCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}

export default Events;
