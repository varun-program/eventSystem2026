import { useNavigate } from "react-router-dom";

function EventCard({ title, coordinator, staff, fee, type, qrLink }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative bg-black/80
        border border-red-700 rounded-xl
        p-6
        transition duration-300
        hover:-translate-y-2
        hover:shadow-[0_0_40px_red]
        group
      "
    >
      {/* Glow layer (CLICK SAFE) */}
      <div
        className="
          absolute inset-0 rounded-xl
          bg-red-600 opacity-10 blur-2xl
          group-hover:opacity-30
          transition
          pointer-events-none
        "
      ></div>

      <h2 className="text-red-500 text-2xl mb-3 relative">
        {title}
      </h2>

      <p className="text-gray-400 text-sm relative">
        Coordinator: {coordinator}
      </p>

      <p className="text-gray-400 text-sm relative">
        Staff In-charge: {staff}
      </p>

      <p className="text-gray-300 mt-4 relative">
        Fee: ₹{fee} / head
      </p>

      <button
        onClick={() =>
          navigate("/register", {
            state: {
              event: {
                title,
                fee,
                type,
                qrLink, // ✅ PASS QR LINK
              },
            },
          })
        }
        className="
          mt-6 w-full py-2
          border border-red-600
          text-red-500 tracking-widest
          hover:bg-red-600 hover:text-black
          hover:shadow-[0_0_25px_red]
          transition
          relative
          z-10
        "
      >
        Register
      </button>
    </div>
  );
}

export default EventCard;
