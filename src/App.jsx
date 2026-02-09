import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminRegistrations from "./pages/AdminRegistrations";
import PageLoader from "./components/PageLoader";
import CinematicBackground from "./components/CinematicBackground";
import Developers from "./pages/Developers";
import FloatingSocials from "./components/FloatingSocials";




/* =========================
   ROUTE WRAPPER
   ========================= */
function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 🎬 smooth cinematic timing

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* GLOBAL BACKGROUND (always visible) */}
      <CinematicBackground />

      {/* CINEMATIC PAGE LOADER */}
      {loading && <PageLoader />}

      {/* NAVBAR (always on top) */}
      <Navbar />
      <FloatingSocials />

      {/* PAGE CONTENT */}
      <main
        key={location.pathname}
        className="pt-20 md:pt-24 min-h-screen relative z-10"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-registrations" element={<AdminRegistrations />} />

          {/* FALLBACK */}
          <Route
            path="*"
            element={
              <div className="p-10 text-red-500 text-2xl">
                404 – Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

/* =========================
   ROOT
   ========================= */
export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
