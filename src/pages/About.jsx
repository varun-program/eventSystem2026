import { useState } from "react";

function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const events = [
    {
      event: "Coding Challenge",
      staff: "Staff A",
      staffPhone: "9XXXXXXXXX",
      student: "Student A",
      studentPhone: "9XXXXXXXXX",
    },
    {
      event: "Debugging",
      staff: "Staff B",
      staffPhone: "9XXXXXXXXX",
      student: "Student B",
      studentPhone: "9XXXXXXXXX",
    },
    {
      event: "Paper Presentation",
      staff: "Staff C",
      staffPhone: "9XXXXXXXXX",
      student: "Student C",
      studentPhone: "9XXXXXXXXX",
    },
    // ➕ add up to 10 events here
  ];

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 text-white animate-fadeIn">

      {/* HERO */}
      <div className="text-center mb-24">
        <h1
          className="glitch-text text-5xl md:text-6xl tracking-[0.4em]"
          data-text="BLITZMAC'26"
        >
          BLITZMAC&apos;26
        </h1>

        <p className="mt-6 text-gray-400 tracking-widest">
          Technical Symposium
        </p>

        <p className="mt-4 text-red-400 tracking-[0.3em] flicker text-sm">
          ENTER THE UPSIDE DOWN OF TECHNOLOGY
        </p>
      </div>

      {/* ABOUT EVENT */}
      <div className="max-w-4xl mx-auto text-center mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-6 glow-text">
          ABOUT THE EVENT
        </h2>

        <p className="text-gray-400 leading-relaxed tracking-wide">
          BLITZMAC&apos;26 is a technical symposium organized by the Department
          of Information Technology & Artificial Intelligence and Machine Learning,
          VSB College of Engineering. The event blends innovation, competition,
          and creativity with a cinematic Stranger Things–inspired experience.
        </p>
      </div>

      {/* HOD */}
      <div className="text-center mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-10 glow-text">
          HEAD OF DEPARTMENT
        </h2>

        <div className="max-w-sm mx-auto bg-black/80 border border-red-700 rounded-xl p-6 hover:shadow-[0_0_30px_red]">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-red-600/20"></div>
          <h3 className="text-red-400 tracking-widest">
            Dr. S. Rinesh
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Professor & Head, IT & AIML Department
          </p>
        </div>
      </div>

      {/* MAIN STAFF COORDINATOR */}
      <div className="text-center mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-10 glow-text">
          MAIN STAFF COORDINATOR
        </h2>

        <div className="max-w-sm mx-auto bg-black/80 border border-red-700 rounded-xl p-6 hover:shadow-[0_0_30px_red]">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-600/10"></div>
          <h3 className="text-red-400 tracking-widest">
            S. Prabhu
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Overall Event Coordinator
          </p>
          <p className="text-gray-500 text-sm mt-2">
            📞 9600406977
          </p>
        </div>
      </div>

      {/* EVENT COORDINATORS – ACCORDION */}
      <div className="mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-14 text-center glow-text">
          EVENT COORDINATORS
        </h2>

        <div className="space-y-6 max-w-5xl mx-auto">
          {events.map((e, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="bg-black/80 border border-red-700 rounded-xl overflow-hidden"
              >
                {/* HEADER */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="
                    w-full flex justify-between items-center
                    px-6 py-4
                    text-left
                    text-red-400 tracking-widest
                    hover:bg-red-600/10
                  "
                >
                  <span>{e.event}</span>
                  <span
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* BODY */}
                {isOpen && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-4">
                      <div>
                        <p className="text-gray-400">
                          Staff Coordinator
                        </p>
                        <p className="text-red-400">
                          {e.staff} – 📞 {e.staffPhone}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          Student Coordinator
                        </p>
                        <p className="text-red-400">
                          {e.student} – 📞 {e.studentPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PAYMENT QUERIES */}
      <div className="mb-20">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-14 text-center glow-text">
          PAYMENT QUERIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {[
            { name: "Coordinator X", phone: "9876543210" },
            { name: "Coordinator Y", phone: "9123456789" },
          ].map((p, i) => (
            <div
              key={i}
              className="bg-black/80 border border-red-700 rounded-xl p-6 text-center hover:shadow-[0_0_25px_red]"
            >
              <h4 className="text-red-400 tracking-widest">{p.name}</h4>
              <p className="text-gray-400 mt-2">📞 {p.phone}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default About;
