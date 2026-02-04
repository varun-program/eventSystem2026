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

  // 👥 PARTICIPANT COUNT
  const participantCount =
    event.type === "team" ? members.length + 1 : 1;

  const totalAmount = event.fee * participantCount;

  // 🔗 GOOGLE FORM PREFILL LINK
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
    <section className="min-h-screen px-6 py-24 flex justify-center">
      <div className="
        w-full max-w-2xl
        bg-black/80
        border border-red-700
        rounded-xl
        p-10
        animate-fadeIn
        shadow-[0_0_40px_rgba(229,9,20,0.35)]
      ">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="
            text-red-600 text-3xl md:text-4xl
            tracking-[0.25em]
            glow-text mb-2
          ">
            REGISTRATION
          </h1>
          <p className="text-gray-400 tracking-widest text-sm">
            {event.title}
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            className="w-full p-3 bg-black border border-red-600 text-white focus:outline-none focus:shadow-[0_0_20px_red]"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 bg-black border border-red-600 text-white focus:outline-none focus:shadow-[0_0_20px_red]"
            placeholder="College Name"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />

          <input
            className="w-full p-3 bg-black border border-red-600 text-white focus:outline-none focus:shadow-[0_0_20px_red]"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            className="w-full p-3 bg-black border border-red-600 text-white focus:outline-none focus:shadow-[0_0_20px_red]"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* TEAM EVENT */}
        {event.type === "team" && (
          <div className="mt-8">
            <h3 className="text-red-500 tracking-widest mb-4">
              TEAM DETAILS
            </h3>

            <input
              className="w-full p-3 mb-3 bg-black border border-red-600 text-white"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            {members.map((m, i) => (
              <input
                key={i}
                className="w-full p-3 mb-2 bg-black border border-red-600 text-white"
                placeholder={`Member ${i + 1} Name`}
                onChange={(e) => {
                  const copy = [...members];
                  copy[i] = e.target.value;
                  setMembers(copy);
                }}
              />
            ))}

            <button
              onClick={addMember}
              className="text-red-500 underline text-sm mt-2"
            >
              + Add Team Member
            </button>
          </div>
        )}

        {/* PAYMENT */}
        <div className="mt-10 border-t border-red-700 pt-6">
          <p className="text-gray-300 mb-3">
            Total Payable Amount:
            <span className="text-red-500 text-lg ml-2">
              ₹{totalAmount}
            </span>
          </p>

          <a
            href={event.qrLink}
            target="_blank"
            rel="noreferrer"
            className="block text-red-500 underline mb-4"
          >
            Open Payment QR (GPay / Paytm)
          </a>

          <a
            href={formLink}
            target="_blank"
            rel="noreferrer"
            className="
              block text-center py-3
              border border-red-600
              text-red-500 tracking-widest
              hover:bg-red-600 hover:text-black
              hover:shadow-[0_0_30px_red]
              transition
            "
          >
            Upload Payment Screenshot
          </a>
        </div>

        {/* SUBMIT */}
        <button
          onClick={submitForm}
          className="
            w-full mt-10 py-4
            border border-red-600
            text-red-500 tracking-[0.3em]
            hover:bg-red-600 hover:text-black
            hover:shadow-[0_0_40px_red]
            transition
          "
        >
          CONFIRM REGISTRATION
        </button>
      </div>
    </section>
  );
}

export default Register;
