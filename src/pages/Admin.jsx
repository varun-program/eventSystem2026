import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function Admin() {
  const [title, setTitle] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [staff, setStaff] = useState("");
  const [fee, setFee] = useState("");

  const addEvent = async () => {
    await addDoc(collection(db, "events"), {
      title,
      coordinator,
      staff,
      fee,
    });

    alert("Event added!");
    setTitle(""); setCoordinator(""); setStaff(""); setFee("");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-red-600 text-3xl mb-6">Admin Panel</h1>

      <input
        className="w-full p-2 mb-3 bg-black border border-red-600"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-2 mb-3 bg-black border border-red-600"
        placeholder="Coordinator"
        value={coordinator}
        onChange={(e) => setCoordinator(e.target.value)}
      />

      <input
        className="w-full p-2 mb-3 bg-black border border-red-600"
        placeholder="Staff In-charge"
        value={staff}
        onChange={(e) => setStaff(e.target.value)}
      />

      <input
        className="w-full p-2 mb-5 bg-black border border-red-600"
        placeholder="Fee"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      />

      <button
        onClick={addEvent}
        className="w-full border border-red-600 py-2 text-red-500 hover:bg-red-600 hover:text-black"
      >
        ADD EVENT
      </button>
    </div>
  );
}

export default Admin;
