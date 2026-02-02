import EventCard from "../components/EventCard";

function Events() {
  return (
    <section className="px-16 py-20 animate-fadeIn">
      
      <h1 className="
        text-5xl text-red-600 mb-16
        tracking-widest
        drop-shadow-[0_0_30px_red]
      ">
        EVENTS FROM THE UPSIDE DOWN
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <EventCard
          title="Code in the Upside Down"
          coordinator="Varun"
          staff="Dr. Kumar"
          fee={200}
        />
        <EventCard
          title="Debug or Die"
          coordinator="Rahul"
          staff="Dr. Suresh"
          fee={150}
        />
        <EventCard
          title="Hack the Hawkins Lab"
          coordinator="Anitha"
          staff="Dr. Priya"
          fee={300}
        />
      </div>
    </section>
  );
}

export default Events;
