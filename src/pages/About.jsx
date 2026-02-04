function About() {
  const organizers = [
    {
      name: "Sigma Shiva",
      role: "Overall Coordinator",
      video: "/organizers/shiva.mp4",
    },
    {
      name: "VARUN G",
      role: "Event Portal Developer",
      video: "/organizers/varun.mp4",
    },
    {
      name: "Selva",
      role: "Managing Coordinator",
      video: "/organizers/selva.mp4",
    },
  ];

  return (
    <section className="relative min-h-screen px-6 md:px-16 py-24 text-white overflow-hidden animate-fadeIn">

      {/* AMBIENT BACKGROUND */}
      <div className="absolute inset-0 hero-glow"></div>
      <div className="absolute inset-0 scanlines"></div>

      {/* HERO SECTION */}
      <div className="relative text-center mb-32">
        <h1
          className="
            glitch-text
            text-5xl md:text-6xl
            font-bold
            tracking-[0.4em]
            mb-6
          "
          data-text="BLITZMAC'26"
        >
          BLITZMAC&apos;26
        </h1>

        <p className="text-gray-300 tracking-widest">
          Department of Computer Science & Engineering
        </p>

        <p className="text-gray-500 mt-2 tracking-widest text-sm">
          VSB College of Engineering
        </p>

        <p className="mt-10 text-red-400 tracking-[0.35em] text-sm flicker">
          ENTER THE UPSIDE DOWN OF TECHNOLOGY
        </p>
      </div>

      {/* MAIN ORGANIZERS */}
      <div className="relative mb-36">
        <h2 className="
          text-red-500 text-3xl
          tracking-[0.3em]
          mb-16 text-center glow-text
        ">
          MAIN EVENT ORGANIZERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-6xl mx-auto">
          {organizers.map((org, index) => (
            <div
              key={index}
              className="
                relative bg-black/80
                border border-red-700
                rounded-xl overflow-hidden
                hover:-translate-y-2
                hover:shadow-[0_0_50px_red]
                transition
              "
            >
              {/* VIDEO AS GIF */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="
                  w-full h-60 object-cover
                  grayscale hover:grayscale-0
                  transition duration-500
                "
              >
                <source src={org.video} type="video/mp4" />
              </video>

              {/* INFO */}
              <div className="p-6 text-center">
                <h3 className="text-xl text-red-500 tracking-widest">
                  {org.name}
                </h3>
                <p className="text-gray-400 mt-2 text-sm">
                  {org.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OTHER COORDINATORS */}
      <div className="relative mb-36">
        <h2 className="
          text-red-500 text-3xl
          tracking-[0.3em]
          mb-16 text-center glow-text
        ">
          EVENT COORDINATORS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            { name: "Coordinator A", role: "Coding Event" },
            { name: "Coordinator B", role: "Debugging Event" },
            { name: "Coordinator C", role: "Gaming Event" },
            { name: "Coordinator D", role: "Workshop" },
          ].map((c, i) => (
            <div
              key={i}
              className="
                bg-black/70
                border border-red-700
                rounded-lg p-6 text-center
                hover:shadow-[0_0_30px_red]
                hover:-translate-y-1
                transition
              "
            >
              <div className="
                w-24 h-24 mx-auto mb-4
                rounded-full bg-red-600/10
                flex items-center justify-center
              ">
                <span className="text-red-500 text-2xl">👤</span>
              </div>

              <h4 className="text-red-400 tracking-widest">
                {c.name}
              </h4>

              <p className="text-gray-400 text-sm mt-1">
                {c.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY THIS EVENT */}
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="
          text-red-500 text-3xl
          tracking-[0.3em]
          mb-6 glow-text
        ">
          WHY THIS EVENT?
        </h2>

        <p className="text-gray-400 leading-relaxed tracking-wide">
          BLITZMAC&apos;26 is crafted to ignite curiosity, creativity, and
          competitive spirit by blending technology, innovation, and a fully
          immersive Stranger Things–inspired experience that students will
          remember long after the event ends.
        </p>
      </div>
    </section>
  );
}

export default About;
