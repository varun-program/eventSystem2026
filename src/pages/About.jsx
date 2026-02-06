import { useState } from "react";

function About() {
  const [openIndex, setOpenIndex] = useState(null);

  const events = [
    { event: "Technova Talk", staff: "C.Kaliamuthan", student: "Barani Kumar", studentPhone: "6382140381" },
    { event: "Code Relay", staff: "U.L.Sindhu", student: "S.Yoghesh", studentPhone: "6384766889" },
    { event: "Future Tech Workshop", staff: "V.Dickson Irudayaraj", student: "Rohith", studentPhone: "8098286554" },
    { event: "Webcraft Studio", staff: "G.L.Dayana", student: "Sriharan", studentPhone: "6383739843" },
    { event: "Jumbled Codes", staff: "S.Arun Kumar", student: "Sivakumar", studentPhone: "7871581868" },
    { event: "Bug Hunt", staff: "V.Dickson Irudayaraj", student: "Sree Ragav Bala", studentPhone: "6385420887" },
    { event: "Meme Craft", staff: "V.Asok Kumar", student: "Nagarajan", studentPhone: "9025291590" },
    { event: "Brain Byte Battle", staff: "P.Sahaya Suganya Princes", student: "Raghul", studentPhone: "9865735302" },
    { event: "Twist The Tale", staff: "Prabu", student: "Mukesh", studentPhone: "9940862572" },
    { event: "The Hidden Gate", staff: "Venkatesh", student: "Varun", studentPhone: "7904686595" },
    { event: "Design X Showcase", staff: "V.Asok Kumar", student: "Yugachandran", studentPhone: "9003463789" },
  ];

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 text-white animate-fadeIn">

      {/* HERO */}
      <div className="text-center mb-24">
        <h1 className="glitch-text text-5xl md:text-6xl tracking-[0.4em]" data-text="BLITZMAC'26">
          BLITZMAC&apos;26
        </h1>
        <p className="mt-6 text-gray-400 tracking-widest">Technical Symposium</p>
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
          BLITZMAC&apos;26 is a technical symposium organized by the Department of
          Information Technology & Artificial Intelligence and Machine Learning,
          VSB College of Engineering. The event blends innovation, competition,
          and creativity with a cinematic Stranger Things–inspired experience.
        </p>
      </div>

      {/* EVENT LEADERSHIP */}
      <div className="mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-14 text-center glow-text">
          EVENT LEADERSHIP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-5xl mx-auto">

          {/* HOD */}
          <div className="bg-black/80 border border-red-700 rounded-xl p-8 text-center hover:shadow-[0_0_40px_red] transition">
            <div className="
              relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden
              border-2 border-red-600
              shadow-[0_0_30px_rgba(229,9,20,0.9)]
            ">
              <img
                src="/hod.jpg"
                alt="HOD"
                className="
                  w-full h-full object-cover
                  brightness-110 contrast-110
                  transition duration-500
                  hover:scale-105
                "
              />
            </div>
            <h3 className="text-red-400 tracking-widest text-lg">Dr. S. Rinesh</h3>
            <p className="text-gray-400 text-sm mt-2">Professor & Head of Department</p>
            <p className="text-gray-500 text-sm">IT & AIML Department</p>
          </div>

          {/* MAIN STAFF COORDINATOR */}
          <div className="bg-black/80 border border-red-700 rounded-xl p-8 text-center hover:shadow-[0_0_40px_red] transition">
            <div className="
              relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden
              border-2 border-red-600
              shadow-[0_0_30px_rgba(229,9,20,0.9)]
            ">
              <img
                src="/main-coordinator.png"
                alt="Main Coordinator"
                className="
                  w-full h-full object-cover
                  brightness-110 contrast-110
                  transition duration-500
                  hover:scale-105
                "
              />
            </div>
            <h3 className="text-red-400 tracking-widest text-lg">S. Prabhu</h3>
            <p className="text-gray-400 text-sm mt-2">Main Staff Coordinator</p>
            <p className="text-gray-500 text-sm mt-2">📞 9600406977</p>
          </div>

        </div>
      </div>

      {/* EVENT COORDINATORS */}
      <div className="mb-32">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-14 text-center glow-text">
          EVENT COORDINATORS
        </h2>

        <div className="space-y-6 max-w-5xl mx-auto">
          {events.map((e, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-black/80 border border-red-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-red-400 tracking-widest hover:bg-red-600/10"
                >
                  <span>{e.event}</span>
                  <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-4">
                      <div>
                        <p className="text-gray-400">Staff Coordinator</p>
                        <p className="text-red-400">{e.staff}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Student Coordinator</p>
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
            { name: "Siva Kumar", phone: "+91 7871581868" },
            { name: "Yoghesh", phone: "+91 6384766889" },
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

      {/* INVITATION */}
      <div className="text-center mb-20">
        <h2 className="text-red-500 text-3xl tracking-[0.3em] mb-10 glow-text">
          EVENT INVITATION
        </h2>
        <a
          href="/BLITZMAC26_INVITATION.pdf"
          download
          className="inline-block px-10 py-4 border border-red-600 text-red-400 tracking-widest rounded-full hover:bg-red-600 hover:text-black transition-all duration-300 shadow-[0_0_20px_red]"
        >
          ⬇ DOWNLOAD INVITATION
        </a>
      </div>

    </section>
  );
}

export default About;
