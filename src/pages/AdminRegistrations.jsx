import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function AdminRegistrations() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // 📊 SUMMARY STATS
  const [stats, setStats] = useState({
    total: 0,
    vsb: 0,
    other: 0,
    expectedAmount: 0,
  });

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const snap = await getDocs(collection(db, "registrations"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setRegistrations(data);
      calculateStats(data);
      setDataLoading(false);
    };

    fetchData();
  }, [user]);

  /* ================= CALCULATE STATS ================= */
  const calculateStats = (data) => {
    let vsb = 0;
    let other = 0;
    let expectedAmount = 0;

    data.forEach((r) => {
      if (r.isVSBStudent) vsb++;
      else other++;

      expectedAmount += Number(r.totalAmount || 0);
    });

    setStats({
      total: data.length,
      vsb,
      other,
      expectedAmount,
    });
  };

  /* ================= UPDATE PAYMENT ================= */
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "registrations", id), {
      paymentStatus: status,
    });

    const updated = registrations.map((r) =>
      r.id === id ? { ...r, paymentStatus: status } : r
    );

    setRegistrations(updated);
    calculateStats(updated);
  };

  /* ================= EXPORT CSV ================= */
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
      "Student Type",
      "Participants",
      "Participant Count",
      "Fee Per Person",
      "Total Amount",
    ];

    const rows = verified.map((r) => {
      const memberNames = Array.isArray(r.participants)
        ? r.participants.map((p) => `${p.name} (${p.role})`).join(" | ")
        : "";

      return [
        r.technicalEvent || "—",
        r.nonTechnicalEvent || "—",
        r.studentName || "",
        r.email || "",
        r.college || "",
        r.department || "",
        r.phone || "",
        r.isVSBStudent ? "VSB" : "Other",
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

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "verified_registrations.csv";
    link.click();
  };

  /* ================= GUARDS ================= */
  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Checking admin access...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Admins only
      </div>
    );

  if (dataLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Loading registrations...
      </div>
    );

  return (
    <div className="min-h-screen p-10">

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-black/80 border border-red-700 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-red-500 text-2xl">{stats.total}</p>
        </div>

        <div className="bg-black/80 border border-green-600 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">VSB Students</p>
          <p className="text-green-400 text-2xl">{stats.vsb}</p>
          <p className="text-xs text-gray-500">₹150 / head</p>
        </div>

        <div className="bg-black/80 border border-yellow-600 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Other Colleges</p>
          <p className="text-yellow-400 text-2xl">{stats.other}</p>
          <p className="text-xs text-gray-500">₹300 / head</p>
        </div>

        <div className="bg-black/80 border border-blue-600 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Expected Amount</p>
          <p className="text-blue-400 text-2xl">₹{stats.expectedAmount}</p>
        </div>
      </div>

      {/* ================= HEADER ================= */}
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

      {/* ================= LIST ================= */}
      <div className="space-y-6">
        {registrations.map((r) => (
          <div
            key={r.id}
            className="border border-red-600 rounded-xl p-6 bg-black/80"
          >
            <p><b>Technical Event:</b> {r.technicalEvent}</p>
            <p><b>Non-Technical Event:</b> {r.nonTechnicalEvent}</p>
            <p><b>Leader:</b> {r.studentName}</p>
            <p><b>College:</b> {r.college}</p>
            <p><b>Type:</b> {r.isVSBStudent ? "VSB Student" : "Other College"}</p>
            <p><b>Total Amount:</b> ₹{r.totalAmount}</p>

            <p className="mt-2">
              <b>Status:</b>{" "}
              <span className={
                r.paymentStatus === "verified"
                  ? "text-green-500"
                  : r.paymentStatus === "rejected"
                  ? "text-red-500"
                  : "text-yellow-400"
              }>
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
