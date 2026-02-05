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

  // 📊 EXPORT VERIFIED REGISTRATIONS (WITH TECH + NON-TECH)
  const exportToCSV = () => {
    const verified = registrations.filter(
      (r) => r.paymentStatus === "verified"
    );

    if (verified.length === 0) {
      alert("No verified registrations to export");
      return;
    }

    const headers = [
      "Technical Event",
      "Non-Technical Event",
      "Leader Name",
      "Email",
      "College",
      "Department",
      "Phone",
      "Participants",
      "Participant Count",
      "Fee Per Person",
      "Total Amount",
    ];

    const rows = verified.map((r) => {
      const memberNames = Array.isArray(r.participants)
        ? r.participants
            .map((p) => `${p.name} (${p.role})`)
            .join(" | ")
        : "";

      return [
        r.technicalEvent || "—",
        r.nonTechnicalEvent || "—",
        r.studentName || "",
        r.email || "",
        r.college || "",
        r.department || "",
        r.phone || "",
        memberNames,
        r.participantCount || "",
        r.feePerPerson || "",
        r.totalAmount || "",
      ];
    });

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.map(String).join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "verified_registrations_with_events.csv";
    link.click();
  };

  // ⏳ Guards
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-red-600 text-3xl tracking-widest">
          REGISTRATIONS
        </h1>

        <button
          onClick={exportToCSV}
          className="border border-green-500 px-4 py-2 text-green-500 hover:bg-green-500 hover:text-black"
        >
          Download Verified (Excel)
        </button>
      </div>

      <div className="space-y-6">
        {registrations.map((r) => (
          <div
            key={r.id}
            className="border border-red-600 rounded-xl p-6 bg-black/80"
          >
            <p><b>Technical Event:</b> {r.technicalEvent || "—"}</p>
            <p><b>Non-Technical Event:</b> {r.nonTechnicalEvent || "—"}</p>
            <p><b>Leader:</b> {r.studentName}</p>
            <p><b>Email:</b> {r.email || "—"}</p>
            <p><b>College:</b> {r.college}</p>
            <p><b>Phone:</b> {r.phone}</p>

            {/* PARTICIPANTS */}
            <div className="mt-2">
              <b>Participants:</b>
              {Array.isArray(r.participants) ? (
                <ul className="list-disc ml-6 text-gray-400">
                  {r.participants.map((p, i) => (
                    <li key={i}>
                      {p.name} ({p.role})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 ml-2">Not available</p>
              )}
            </div>

            <p className="mt-2">
              <b>Total Amount:</b> ₹{r.totalAmount}
            </p>

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
