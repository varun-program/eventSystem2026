function Developers() {
  const devs = [
    {
      name: "SIVAKUMAR S",
      role: "Backend Developer",
      tech: "Firebase • Database • Auth",
      video: "/organizers/shiva.mp4",
      image: "/organizers/shiva.jpg",
    },
    {
      name: "VARUN G",
      role: "Full Stack Developer",
      tech: "React • Firebase • Tailwind",
      video: "/organizers/varun.mp4",
      image: "/organizers/varun.jpg",
    },
    {
      name: "YOGHESH S",
      role: "UI Designer",
      tech: "UI/UX • Figma",
      video: "/organizers/selva.mp4",
      image: "/organizers/selva.jpg",
    },
    {
      name: "RAGHUL S",
      role: "Video Editor",
      tech: "Premiere Pro • After Effects",
      video: "/organizers/raghul.mp4",
      image: "/organizers/raghul.jpg",
    },
  ];

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 text-white">

      {/* HERO */}
      <div className="text-center mb-20">
        <h1 className="glitch-text text-4xl md:text-6xl tracking-[0.3em]">
          DEVELOPERS
        </h1>

        <p className="mt-4 text-gray-400 tracking-widest text-sm">
          Built with passion, pressure & sleepless nights
        </p>

        {/* MOBILE NOTICE */}
        <div className="mt-4 md:hidden">
          <p className="text-xs text-yellow-400 tracking-wide border border-yellow-500/40 inline-block px-4 py-2 rounded-full bg-yellow-500/10">
            📱 Desktop view recommended for best experience
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {devs.map((dev, index) => (
          <div
            key={index}
            className="
              bg-black/80 border border-red-700
              rounded-xl overflow-hidden
              transition md:hover:-translate-y-1
              md:hover:shadow-[0_0_40px_red]
            "
          >
            {/* DESKTOP VIDEO */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="
                hidden md:block
                w-full h-56 object-cover
                grayscale hover:grayscale-0
                transition duration-500
              "
            >
              <source src={dev.video} type="video/mp4" />
            </video>

            {/* MOBILE IMAGE */}
            <img
              src={dev.image}
              alt={dev.name}
              className="md:hidden w-full h-56 object-cover"
            />

            {/* INFO */}
            <div className="p-5 text-center">
              <h2 className="text-red-500 tracking-widest text-lg">
                {dev.name}
              </h2>

              <p className="text-gray-300 text-sm mt-1">
                {dev.role}
              </p>

              <p className="text-gray-500 text-xs mt-3">
                {dev.tech}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-24 text-center text-gray-500 text-xs tracking-widest">
        Crafted for BLITZMAC&apos;26
      </div>
    </section>
  );
}

export default Developers;
