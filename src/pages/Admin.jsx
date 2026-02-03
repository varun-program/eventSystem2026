import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Event form states
  const [title, setTitle] = useState("");
  const [type, setType] = useState("solo");
  const [coordinator, setCoordinator] = useState("");
  const [staff, setStaff] = useState("");
  const [fee, setFee] = useState("");
  const [qrLink, setQrLink] = useState("");

  // 🔐 Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Checking admin access...
      </div>
    );
  }

  // 🚫 Not admin
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Access Denied. Admins only.
      </div>
    );
  }

  // ➕ Add event
  const addEvent = async () => {
    if (!title || !coordinator || !staff || !fee || !qrLink) {
      alert("Please fill all fields including QR link");
      return;
    }

    await addDoc(collection(db, "events"), {
      title,
      type,
      coordinator,
      staff,
      fee: Number(fee),
      qrLink, // ✅ IMPORTANT
      createdAt: new Date(),
    });

    alert("Event added successfully!");

    // Reset form
    setTitle("");
    setType("solo");
    setCoordinator("");
    setStaff("");
    setFee("");
    setQrLink("");
  };

  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="w-full max-w-xl bg-black/80 border border-red-700 rounded-xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-red-600 text-3xl">
            Admin Panel
          </h1>
          <button
            onClick={() => signOut(auth)}
            className="text-red-400 hover:text-red-600 underline"
          >
            Logout
          </button>
        </div>

        {/* Event Title */}
        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Event Type */}
        <select
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="solo">Solo Event</option>
          <option value="team">Team Event</option>
        </select>

        {/* Coordinator */}
        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Coordinator Name"
          value={coordinator}
          onChange={(e) => setCoordinator(e.target.value)}
        />

        {/* Staff */}
        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Staff In-charge"
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
        />

        {/* Fee */}
        <input
          type="number"
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Fee (₹)"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />

        {/* QR LINK */}
        <input
          className="w-full p-2 mb-6 bg-black border border-red-600 text-white"
          placeholder="Payment QR Link (Google Drive / UPI link)"
          value={qrLink}
          onChange={(e) => setQrLink(e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={addEvent}
          className="
            w-full py-3
            border border-red-600
            text-red-500 tracking-widest
            hover:bg-red-600 hover:text-black
            hover:shadow-[0_0_25px_red]
            transition
          "
        >
          ADD EVENT
        </button>
      </div>
    </div>
  );
}

export default Admin;
