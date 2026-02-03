import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function AdminRegistrations() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // 🔐 Admin auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // 📥 Fetch registrations
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const snap = await getDocs(collection(db, "registrations"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setRegistrations(data);
      setDataLoading(false);
    };

    fetchData();
  }, [user]);

  // ✅ Update payment status
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "registrations", id), {
      paymentStatus: status,
    });

    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, paymentStatus: status } : r
      )
    );
  };

  // 📊 EXPORT VERIFIED REGISTRATIONS
  const exportToCSV = () => {
    const verified = registrations.filter(
      (r) => r.paymentStatus === "verified"
    );

    if (verified.length === 0) {
      alert("No verified registrations to export");
      return;
    }

    const headers = [
      "Event Name",
      "Student Name",
      "College",
      "Department",
      "Phone",
      "Participants",
      "Fee Per Person",
      "Total Amount",
      "Payment Status",
    ];

    const rows = verified.map((r) => [
      r.eventName,
      r.studentName,
      r.college,
      r.department,
      r.phone,
      r.participants,
      r.feePerPerson,
      r.totalAmount,
      r.paymentStatus,
    ]);

    let csvContent =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "verified_registrations.csv";
    link.click();
  };

  // ⏳ Render guards
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Checking admin access...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Admins only
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Loading registrations...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-red-600 text-3xl">
          Registrations & Payments
        </h1>

        <button
          onClick={exportToCSV}
          className="
            border border-green-500
            px-4 py-2
            text-green-500
            hover:bg-green-500 hover:text-black
            transition
          "
        >
          Download Verified (Excel)
        </button>
      </div>

      {registrations.length === 0 && (
        <p className="text-gray-400">No registrations yet.</p>
      )}

      <div className="space-y-6">
        {registrations.map((r) => (
          <div
            key={r.id}
            className="border border-red-600 rounded-lg p-5 bg-black/80"
          >
            <p><b>Event:</b> {r.eventName}</p>
            <p><b>Student:</b> {r.studentName}</p>
            <p><b>College:</b> {r.college}</p>
            <p><b>Phone:</b> {r.phone}</p>
            <p><b>Total:</b> ₹{r.totalAmount}</p>

            <p className="mt-2">
              <b>Status:</b>{" "}
              <span
                className={
                  r.paymentStatus === "verified"
                    ? "text-green-500"
                    : r.paymentStatus === "rejected"
                    ? "text-red-500"
                    : "text-yellow-400"
                }
              >
                {r.paymentStatus}
              </span>
            </p>

            <div className="mt-4 space-x-4">
              <button
                onClick={() => updateStatus(r.id, "verified")}
                className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
              >
                Verify
              </button>

              <button
                onClick={() => updateStatus(r.id, "rejected")}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRegistrations;
