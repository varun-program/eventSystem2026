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

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // ⏱ cinematic delay

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader />}

      <Navbar />

      <div className="pt-24 min-h-screen animate-fadeIn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-registrations" element={<AdminRegistrations />} />

          <Route
            path="*"
            element={
              <div className="p-10 text-red-500 text-2xl">
                404 – Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
