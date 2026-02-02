import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays common for all pages */}
      <Navbar />

      {/* Page Content */}
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />

          {/* 🔴 Fallback Route (VERY IMPORTANT) */}
          <Route
            path="*"
            element={
              <div className="p-10 text-red-500 text-2xl">
                404 – Page Not Found (Check URL)
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
