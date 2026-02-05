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
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const allEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTechnicalEvents(allEvents.filter(e => e.category === "technical"));
      setNonTechnicalEvents(allEvents.filter(e => e.category === "non-technical"));
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return <Loader />;

  const EventBlock = ({ event, showRegister }) => (
    <div
      className="
        border border-red-700 rounded-xl
        p-6 bg-black/80
        flex flex-col justify-between
        transition-all duration-300
        hover:scale-[1.04]
        hover:-translate-y-2
        hover:shadow-[0_0_30px_red]
      "
    >
      <div>
        <h3 className="text-red-500 tracking-widest mb-2">
          {event.title}
        </h3>

        <p className="text-gray-400 text-sm mb-3">
          {event.description}
        </p>

        {/* 🎁 PRIZE */}
        {/* 🎁 PRIZE (ONLY TECHNICAL EVENTS) */}
        {event.category === "technical" && event.prizeAmount && (
          <p className="text-yellow-400 font-semibold mb-3">
    🏆 Prize Pool: ₹{event.prizeAmount}
              </p>
)}


        {/* COORDINATORS */}
        <div className="text-sm space-y-1">
          <p className="text-gray-400">
            <span className="text-red-400">Staff:</span>{" "}
            {event.staff || "—"}
          </p>

          <p className="text-gray-400">
            <span className="text-red-400">Student:</span>{" "}
            {event.coordinator || "—"}
          </p>
        </div>
      </div>

      {showRegister && (
        <button
          onClick={() => navigate("/register", { state: { event } })}
          className="
            mt-6 py-2
            border border-red-600
            text-red-500 tracking-widest
            hover:bg-red-600 hover:text-black
            transition
          "
        >
          REGISTER
        </button>
      )}
    </div>
  );

  return (
    <section className="min-h-screen px-6 md:px-16 py-24">

      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl text-red-600 tracking-[0.3em] glow-text mb-6">
          EVENTS
        </h1>
        <p className="text-gray-400 tracking-widest text-sm">
          Choose your challenge from the Upside Down
        </p>
      </div>

      <div className="mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.25em] mb-14 text-center">
          TECHNICAL EVENTS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {technicalEvents.map(event => (
            <EventBlock key={event.id} event={event} showRegister />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-red-500 text-3xl tracking-[0.25em] mb-14 text-center">
          NON-TECHNICAL EVENTS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {nonTechnicalEvents.map(event => (
            <EventBlock key={event.id} event={event} showRegister={false} />
          ))}
        </div>
      </div>

    </section>
  );
}

export default Events;
