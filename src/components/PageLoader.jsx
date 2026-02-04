function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines"></div>

      {/* Glow fog */}
      <div className="absolute inset-0 hero-glow"></div>

      {/* Text */}
      <h1
        className="
          glitch-text
          text-red-600
          text-4xl md:text-6xl
          tracking-[0.4em]
          flicker
        "
        data-text="BLITZMAC'26"
      >
        BLITZMAC'26
      </h1>
    </div>
  );
}

export default PageLoader;
