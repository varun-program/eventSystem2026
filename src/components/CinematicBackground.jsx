import { useEffect, useRef, useState } from "react";

function CinematicBackground() {
  const videoRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const enableAudio = () => {
      if (videoRef.current && !audioEnabled) {
        videoRef.current.muted = false;     // 🔊 unmute video
        videoRef.current.volume = 0.25;     // 🎧 soft cinematic volume
        setAudioEnabled(true);
      }
    };

    // Enable audio on first interaction (browser-safe)
    window.addEventListener("click", enableAudio, { once: true });
    window.addEventListener("touchstart", enableAudio, { once: true });

    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
    };
  }, [audioEnabled]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* VIDEO BACKGROUND (AUDIO ENABLES AFTER CLICK) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          opacity-60
        "
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* RED CINEMATIC GLOW */}
      <div className="absolute inset-0 hero-glow"></div>

      {/* SCANLINES */}
      <div className="absolute inset-0 pointer-events-none scanlines"></div>
    </div>
  );
}

export default CinematicBackground;
