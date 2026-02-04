function Loader() {
  return (
    <div className="
      fixed inset-0 z-[9999]
      flex flex-col items-center justify-center
      bg-black
    ">

      {/* Glow Background */}
      <div className="absolute inset-0 hero-glow"></div>

      {/* Loader Text */}
      <h1 className="
        text-red-600 text-4xl md:text-5xl
        tracking-[0.35em]
        glow-text glitch
        mb-6
      ">
        BLITZMAC
      </h1>

      <p className="
        text-gray-400 tracking-widest text-sm flicker
      ">
        ENTERING THE UPSIDE DOWN
      </p>
    </div>
  );
}

export default Loader;
