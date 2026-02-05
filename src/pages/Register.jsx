import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const FEE_PER_PERSON = 300;

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        No event selected
      </div>
    );
  }

  /* ================= BASIC DETAILS ================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  /* ================= TEAM DETAILS ================= */
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);

  /* ================= NON-TECH EVENTS ================= */
  const [nonTechEvents, setNonTechEvents] = useState([]);
  const [selectedNonTech, setSelectedNonTech] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const addMember = () => setMembers([...members, ""]);

  const validMembers = members.filter((m) => m.trim() !== "");
  const participantCount =
    event.type === "team" ? validMembers.length + 1 : 1;

  const totalAmount = FEE_PER_PERSON * participantCount;

  /* ================= GOOGLE FORM ================= */
  const googleFormBase =
    "https://docs.google.com/forms/d/e/1FAIpQLSe9UE9pCjojdIvaSMoNOQy407K_tiqa6FFu2_-VUV1N_iFMNg/viewform";

  const formLink =
    `${googleFormBase}?` +
    `entry.1041746971=${encodeURIComponent(name)}` +
    `&entry.1291792597=${encodeURIComponent(event.title)}` +
    `&entry.1362286974=${encodeURIComponent(phone)}`;

  /* ================= FETCH NON-TECH EVENTS ================= */
  useEffect(() => {
    const fetchNonTech = async () => {
      const q = query(
        collection(db, "events"),
        where("category", "==", "non-technical")
      );
      const snap = await getDocs(q);
      setNonTechEvents(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    };

    fetchNonTech();
  }, []);

  /* ================= SUBMIT ================= */
  const submitForm = async () => {
    if (!name || !email || !college || !department || !phone) {
      alert("Fill all required fields");
      return;
    }

    if (!selectedNonTech) {
      alert("Please select one Non-Technical event");
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, "registrations"), {
        studentName: name,
        email,
        phone,
        college,
        department,

        technicalEvent: event.title,
        nonTechnicalEvent: selectedNonTech,

        eventCategory: event.category,
        eventType: event.type,

        teamName: event.type === "team" ? teamName : null,

        participants: [
          { name, role: "Leader" },
          ...(event.type === "team"
            ? validMembers.map((m) => ({
                name: m,
                role: "Member",
              }))
            : []),
        ],

        participantCount,
        feePerPerson: FEE_PER_PERSON,
        totalAmount,

        paymentStatus: "pending",
        createdAt: new Date(),
      });

      alert("Registration successful! Upload payment screenshot.");
      window.open(formLink, "_blank");
      navigate("/events");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-24 flex justify-center">
      <div className="w-full max-w-2xl bg-black/80 border border-red-700 rounded-xl p-10">

        {/* HEADER */}
        <h1 className="text-red-600 text-3xl tracking-[0.25em] text-center mb-6">
          {event.title}
        </h1>

        <p className="text-gray-400 mb-6 text-sm">
          {event.description}
        </p>

        {/* BASIC DETAILS */}
        <div className="space-y-4">
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Student Name" onChange={(e) => setName(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="College" onChange={(e) => setCollege(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Department" onChange={(e) => setDepartment(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
        </div>

        {/* TEAM DETAILS */}
        {event.type === "team" && (
          <div className="mt-8">
            <h3 className="text-red-500 tracking-widest mb-4">
              TEAM DETAILS
            </h3>

            <input
              className="w-full p-3 mb-3 bg-black border border-red-600 text-white"
              placeholder="Team Name"
              onChange={(e) => setTeamName(e.target.value)}
            />

            {members.map((_, i) => (
              <input
                key={i}
                className="w-full p-3 mb-2 bg-black border border-red-600 text-white"
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
              className="text-red-500 underline text-sm"
            >
              + Add Team Member
            </button>
          </div>
        )}

        {/* NON-TECH SELECTION */}
        <div className="mt-10">
          <h3 className="text-red-500 tracking-widest mb-4">
            SELECT ONE NON-TECHNICAL EVENT
          </h3>

          {nonTechEvents.map((e) => (
            <label
              key={e.id}
              className="block text-gray-300 mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="nontech"
                className="mr-2"
                checked={selectedNonTech === e.title}
                onChange={() => setSelectedNonTech(e.title)}
              />
              {e.title}
            </label>
          ))}
        </div>

        {/* PAYMENT */}
        <div className="mt-10 border-t border-red-700 pt-6">
          <p className="text-gray-300 mb-3">
            ₹300 × {participantCount} =
            <span className="text-red-500 ml-2">
              ₹{totalAmount}
            </span>
          </p>

          <a
            href={event.qrLink}
            target="_blank"
            rel="noreferrer"
            className="block text-red-500 underline mb-4"
          >
            Open Payment QR
          </a>

          <a
            href={formLink}
            target="_blank"
            rel="noreferrer"
            className="block text-center py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black"
          >
            Upload Payment Screenshot
          </a>
        </div>

        {/* SUBMIT */}
        <button
          disabled={submitting}
          onClick={submitForm}
          className="w-full mt-10 py-4 border border-red-600 text-red-500 tracking-[0.3em] hover:bg-red-600 hover:text-black"
        >
          CONFIRM REGISTRATION
        </button>
      </div>
    </section>
  );
}

export default Register;
