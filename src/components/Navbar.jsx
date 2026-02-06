import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `
    block md:inline-block
    px-3 py-2
    text-sm tracking-wide md:tracking-widest
    transition duration-300
    ${
      pathname === path
        ? "text-red-500 glow-text"
        : "text-gray-300 hover:text-red-500"
    }
    md:relative
    md:after:content-['']
    md:after:absolute md:after:left-0 md:after:-bottom-1
    md:after:h-[2px] md:after:w-0
    md:after:bg-red-600
    md:after:transition-all md:after:duration-300
    md:hover:after:w-full
  `;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-red-700">
      <div className="flex justify-between items-center px-5 md:px-10 py-4 max-w-7xl mx-auto">

        {/* LOGO */}
        <h1 className="text-red-600 text-xl md:text-2xl tracking-[0.25em] font-bold glow-text">
          BLITZMAC&apos;26
        </h1>

        {/* HAMBURGER (MOBILE) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-red-500 text-2xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex space-x-10">
          <Link className={linkClass("/")} to="/">HOME</Link>
          <Link className={linkClass("/about")} to="/about">ABOUT</Link>
          <Link className={linkClass("/events")} to="/events">EVENTS</Link>
          <Link className={linkClass("/developers")} to="/developers">DEVELOPERS</Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/90 border-t border-red-700 px-6 py-6 space-y-4">
          <Link onClick={() => setOpen(false)} className={linkClass("/")} to="/">HOME</Link>
          <Link onClick={() => setOpen(false)} className={linkClass("/about")} to="/about">ABOUT</Link>
          <Link onClick={() => setOpen(false)} className={linkClass("/events")} to="/events">EVENTS</Link>
          <Link onClick={() => setOpen(false)} className={linkClass("/developers")} to="/developers">DEVELOPERS</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
