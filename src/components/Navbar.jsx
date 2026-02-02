import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `relative px-2 py-1 transition ${
      pathname === path
        ? "text-red-500"
        : "text-gray-300 hover:text-red-500"
    }`;

  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-red-700">
      <h1 className="text-red-600 text-2xl tracking-[0.3em] font-bold">
        EVENT FEST
      </h1>

      <div className="space-x-8 text-sm tracking-widest">
        <Link className={linkClass("/")} to="/">Home</Link>
        <Link className={linkClass("/about")} to="/about">About</Link>
        <Link className={linkClass("/events")} to="/events">Events</Link>
        <Link className={linkClass("/register")} to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
