import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // 🎬 CINEMATIC LOADER WHILE FETCHING
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 animate-fadeIn">

      {/* PAGE HEADER */}
      <div className="text-center mb-20">
        <h1
          className="
            text-4xl md:text-5xl
            text-red-600
            tracking-[0.3em]
            glow-text
            mb-6
          "
        >
          EVENTS
        </h1>

        <p className="text-gray-400 tracking-widest text-sm max-w-xl mx-auto">
          Choose your challenge from the Upside Down
        </p>
      </div>

      {/* EVENTS GRID */}
      {events.length > 0 ? (
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-12
            max-w-7xl mx-auto
          "
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No events have been revealed yet…
        </p>
      )}
    </section>
  );
}

export default Events;
