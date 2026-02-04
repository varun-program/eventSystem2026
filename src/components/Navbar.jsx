import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `
    relative px-2 py-1 tracking-widest text-sm
    transition duration-300
    ${
      pathname === path
        ? "text-red-500 glow-text"
        : "text-gray-300 hover:text-red-500"
    }
    after:content-['']
    after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:w-0
    after:bg-red-600
    after:transition-all after:duration-300
    hover:after:w-full
  `;

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-black/70 backdrop-blur-md
        border-b border-red-700
      "
    >
      <div className="flex justify-between items-center px-10 py-5 max-w-7xl mx-auto">
        
        {/* LOGO */}
        <h1 className="text-red-600 text-2xl tracking-[0.35em] font-bold glow-text flicker">
          BLITZMAC&apos;26
        </h1>

        {/* NAV LINKS */}
        <div className="space-x-10">
          <Link className={linkClass("/")} to="/">HOME</Link>
          <Link className={linkClass("/about")} to="/about">ABOUT</Link>
          <Link className={linkClass("/events")} to="/events">EVENTS</Link>
          <Link className={linkClass("/developers")} to="/developers">DEVELOPERS</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
