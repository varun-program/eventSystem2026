import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative bg-black/80
        border border-red-700 rounded-xl
        p-8
        transition duration-300
        hover:-translate-y-3
        hover:shadow-[0_0_45px_red]
        overflow-hidden
        group
      "
    >
      {/* Glow layer */}
      <div
        className="
          absolute inset-0 rounded-xl
          bg-red-600 opacity-0 blur-2xl
          group-hover:opacity-20
          transition
          pointer-events-none
        "
      ></div>

      {/* CONTENT */}
      <div className="relative z-10">

        <h2 className="text-red-500 text-2xl mb-4 glow-text">
          {event.title}
        </h2>

        <p className="text-gray-400 text-sm mb-1">
          Coordinator: {event.coordinator}
        </p>

        <p className="text-gray-400 text-sm mb-4">
          Staff In-charge: {event.staff}
        </p>

        <p className="text-gray-300 mb-3">
          Type:{" "}
          <span className="text-red-400 uppercase">
            {event.type}
          </span>
        </p>

        <p className="text-gray-300 mb-6">
          Fee:{" "}
          <span className="text-red-400">
            ₹{event.fee} / head
          </span>
        </p>

        {/* REGISTER BUTTON */}
        <button
          onClick={() =>
            navigate("/register", {
              state: { event }, // ✅ PASS FULL EVENT OBJECT
            })
          }
          className="
            w-full py-3
            border border-red-600
            text-red-500 tracking-widest
            hover:bg-red-600 hover:text-black
            hover:shadow-[0_0_30px_red]
            transition
          "
        >
          REGISTER
        </button>

      </div>
    </div>
  );
}

export default EventCard;
