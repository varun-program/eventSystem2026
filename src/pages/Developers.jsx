function Developers() {
  const devs = [
    {
      name: "SIVA KUMAR",
      role: "Event Lead & System Coordinator",
      tech: "Event Architecture • Operations",
      video: "/organizers/shiva.mp4",
    },
    {
      name: "VARUN G",
      role: "Full Stack Developer",
      tech: "React • Firebase • Tailwind • Admin Systems",
      video: "/organizers/varun.mp4", 
    },
    {
      name: "YOGHESH",
      role: "Management & Coordination",
      tech: "Event Flow • Team Handling",
      video: "/organizers/selva.mp4",
    },
  ];

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 text-white animate-fadeIn">

      {/* HERO */}
      <div className="text-center mb-28">
        <h1
          className="glitch-text text-5xl md:text-6xl tracking-[0.4em]"
          data-text="DEVELOPERS"
        >
          DEVELOPERS
        </h1>

        <p className="mt-6 text-gray-400 tracking-widest">
          Built with passion, pressure & sleepless nights
        </p>
      </div>

      {/* DEVELOPERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-6xl mx-auto">
        {devs.map((dev, index) => (
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
              <source src={dev.video} type="video/mp4" />
            </video>

            {/* INFO */}
            <div className="p-6 text-center">
              <h2 className="text-red-500 tracking-widest text-xl">
                {dev.name}
              </h2>

              <p className="text-gray-300 mt-2 text-sm">
                {dev.role}
              </p>

              <p className="text-gray-500 text-xs mt-4">
                {dev.tech}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOT NOTE */}
      <div className="mt-32 text-center text-gray-500 text-sm tracking-widest">
        Crafted for BLITZMAC&apos;26 
      </div>
    </section>
  );
}

export default Developers;
