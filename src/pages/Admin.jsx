import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Event form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("technical");
  const [type, setType] = useState("solo");
  const [coordinator, setCoordinator] = useState("");
  const [staff, setStaff] = useState("");
  const [fee, setFee] = useState("");
  const [prizeAmount, setPrizeAmount] = useState(""); // 🆕
  const [qrLink, setQrLink] = useState("");

  // 🔐 Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Checking admin access...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Access Denied. Admins only.
      </div>
    );
  }

  // ➕ Add event
  const addEvent = async () => {
    if (
      !title ||
      !description ||
      !coordinator ||
      !staff ||
      !fee ||
      !prizeAmount ||
      !qrLink
    ) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "events"), {
      title,
      description,
      category,
      type,
      coordinator,
      staff,
      fee: Number(fee),
      prizeAmount: Number(prizeAmount), // 🆕
      qrLink,
      createdAt: new Date(),
    });

    alert("Event added successfully!");

    setTitle("");
    setDescription("");
    setCategory("technical");
    setType("solo");
    setCoordinator("");
    setStaff("");
    setFee("");
    setPrizeAmount("");
    setQrLink("");
  };

  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="w-full max-w-xl bg-black/80 border border-red-700 rounded-xl p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-red-600 text-3xl">Admin Panel</h1>
          <button
            onClick={() => signOut(auth)}
            className="text-red-400 hover:text-red-600 underline"
          >
            Logout
          </button>
        </div>

        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="technical">Technical Event</option>
          <option value="non-technical">Non-Technical Event</option>
        </select>

        <select
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="solo">Solo Event</option>
          <option value="team">Team Event</option>
        </select>

        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Student Coordinator"
          value={coordinator}
          onChange={(e) => setCoordinator(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Staff Coordinator"
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Registration Fee (₹)"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />

        {/* 🆕 PRIZE AMOUNT */}
        <input
          type="number"
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Prize Amount (₹)"
          value={prizeAmount}
          onChange={(e) => setPrizeAmount(e.target.value)}
        />

        <input
          className="w-full p-2 mb-6 bg-black border border-red-600 text-white"
          placeholder="Payment QR Link"
          value={qrLink}
          onChange={(e) => setQrLink(e.target.value)}
        />

        <button
          onClick={addEvent}
          className="w-full py-3 border border-red-600 text-red-500 tracking-widest hover:bg-red-600 hover:text-black transition"
        >
          ADD EVENT
        </button>
      </div>
    </div>
  );
}

export default Admin;
