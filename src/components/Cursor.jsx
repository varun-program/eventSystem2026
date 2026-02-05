import { useEffect, useState } from "react";

function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const magneticElements = document.querySelectorAll(
      "button, a, .magnetic"
    );

    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        el.classList.add("cursor-magnet")
      );
      el.addEventListener("mouseleave", () =>
        el.classList.remove("cursor-magnet")
      );
    });
  });

  return (
    <div
      className="custom-cursor"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    />
  );
}

export default Cursor;
