import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  // 🔒 SAFETY GUARD
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p>No event selected.</p>
        <button
          onClick={() => navigate("/events")}
          className="mt-4 underline"
        >
          Go back to Events
        </button>
      </div>
    );
  }

  // Form states
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);

  const addMember = () => setMembers([...members, ""]);

  // 🔢 PARTICIPANT COUNT
  const participantCount =
    event.type === "team" ? members.length + 1 : 1;

  const totalAmount = event.fee * participantCount;

  // 🔗 GOOGLE FORM PREFILL LINK (FIXED)
  const googleFormBase =
    "https://docs.google.com/forms/d/e/1FAIpQLSe9UE9pCjojdIvaSMoNOQy407K_tiqa6FFu2_-VUV1N_iFMNg/viewform";

  const formLink =
    `${googleFormBase}?` +
    `entry.1041746971=${encodeURIComponent(name)}` +
    `&entry.1291792597=${encodeURIComponent(event.title)}` +
    `&entry.1362286974=${encodeURIComponent(phone)}`;

  const submitForm = async () => {
    if (!name || !college || !department || !phone) {
      alert("Please fill all required fields");
      return;
    }

    await addDoc(collection(db, "registrations"), {
      eventName: event.title,
      eventType: event.type,
      feePerPerson: event.fee,
      participants: participantCount,
      totalAmount,
      studentName: name,
      college,
      department,
      phone,
      teamName: event.type === "team" ? teamName : null,
      members: event.type === "team" ? members : [],
      paymentStatus: "pending",
      createdAt: new Date(),
    });

    alert("Registration submitted!");
    navigate("/events");
  };

  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="w-full max-w-xl bg-black/80 border border-red-700 rounded-xl p-8">

        <h1 className="text-red-600 text-3xl mb-2">
          Register – {event.title}
        </h1>

        <p className="text-gray-400 mb-6">
          Fee per person: ₹{event.fee}
        </p>

        {/* STUDENT INFO */}
        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="College Name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 bg-black border border-red-600 text-white"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* TEAM EVENT */}
        {event.type === "team" && (
          <>
            <input
              className="w-full p-2 mb-3 bg-black border border-red-600 text-white"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            {members.map((m, i) => (
              <input
                key={i}
                className="w-full p-2 mb-2 bg-black border border-red-600 text-white"
                placeholder={`Member ${i + 2} Name`}
                onChange={(e) => {
                  const copy = [...members];
                  copy[i] = e.target.value;
                  setMembers(copy);
                }}
              />
            ))}

            <button
              onClick={addMember}
              className="text-red-500 mb-4 underline"
            >
              + Add Team Member
            </button>
          </>
        )}

        {/* TOTAL AMOUNT */}
        <p className="text-gray-300 mb-4">
          Total Payable Amount:
          <span className="text-red-500 text-lg ml-2">
            ₹{totalAmount}
          </span>
        </p>

        {/* PAYMENT QR */}
        <div className="mb-4">
          <a
            href={event.qrLink}
            target="_blank"
            rel="noreferrer"
            className="text-red-500 underline"
          >
            Open Payment QR (GPay / Paytm)
          </a>
        </div>

        {/* SCREENSHOT UPLOAD (FIXED) */}
        <a
          href={formLink}
          target="_blank"
          rel="noreferrer"
          className="
            block text-center mb-6 py-2
            border border-red-600
            text-red-500
            hover:bg-red-600 hover:text-black
            transition
          "
        >
          Upload Payment Screenshot
        </a>

        {/* SUBMIT */}
        <button
          onClick={submitForm}
          className="
            w-full py-3
            border border-red-600
            text-red-500 tracking-widest
            hover:bg-red-600 hover:text-black
            hover:shadow-[0_0_25px_red]
            transition
          "
        >
          Submit Registration (₹{totalAmount})
        </button>
      </div>
    </div>
  );
}

export default Register;
