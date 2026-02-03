import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      setEvents(snapshot.docs.map(doc => doc.data()));
    };
    fetchEvents();
  }, []);

  return (
    <section className="px-16 py-20">
      <h1 className="text-5xl text-red-600 mb-16">
        EVENTS FROM THE UPSIDE DOWN
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            coordinator={event.coordinator}
            staff={event.staff}
            fee={event.fee}
            type={event.type}
            qrLink={event.qrLink} // ✅ PASS QR LINK
          />
        ))}
      </div>
    </section>
  );
}

export default Events;
