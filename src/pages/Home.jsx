function Home() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6">
      
      {/* Centered Container */}
      <div className="
      w-full max-w-4xl text-center hero-glow animate-fadeIn">
        {/* College Name */}
        <h2 className="
          text-red-600
          tracking-[0.3em]
          text-sm
          mb-4
        ">
          V.S.B COLLEGE OF ENGINEERING TECHNICAL CAMPUS
        </h2>

        {/* Department */}
        <p className="text-gray-400 mb-8">
          Department of Information Technology & AIML
        </p>

        {/* Event Name */}
        <h1 className="
          text-5xl md:text-6xl
          font-bold
          text-red-600
          mb-6
          drop-shadow-[0_0_35px_red]
        ">
          BLITZMAC'26
        </h1>

        {/* Tagline */}
        <p className="
          text-gray-400
          mb-12
          max-w-xl
          mx-auto
        ">
          Enter the Upside Down of Talent & Innovation
        </p>

        {/* CTA Button */}
        <button className="
          px-10 py-4
          border border-red-600
          text-red-500
          tracking-widest
          hover:bg-red-600 hover:text-black
          hover:shadow-[0_0_30px_red]
          transition duration-300
        ">
          ENTER THE UPSIDE DOWN
        </button>
      </div>
    </section>
  );
}

export default Home;
