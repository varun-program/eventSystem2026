function FloatingSocials() {
  return (
    <div className="fixed bottom-6 right-5 z-[9999] flex flex-col gap-4">

      {/* INSTAGRAM */}
      <a
        href="https://www.instagram.com/blitzmac_vsb?igsh=eWY2MHM4bXg1MTd1"
        target="_blank"
        rel="noreferrer"
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-black/80
          border border-pink-600
          hover:shadow-[0_0_25px_rgba(225,48,108,0.9)]
          transition
        "
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
          alt="Instagram"
          className="w-6 h-6"
        />
      </a>

      {/* WHATSAPP */}
      <a
        href="https://chat.whatsapp.com/L0l2g2IPUFdDVSNomf3n86?mode=gi_t"
        target="_blank"
        rel="noreferrer"
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-black/80
          border border-green-500
          hover:shadow-[0_0_25px_rgba(37,211,102,0.9)]
          transition
        "
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-6 h-6"
        />
      </a>

    </div>
  );
}

export default FloatingSocials;
