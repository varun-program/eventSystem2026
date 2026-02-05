import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

const MAX_TEAM_SIZE = 3;

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  if (!event || event.category !== "technical") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Registration available only for Technical events
      </div>
    );
  }

  /* ================= BASIC ================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  /* ================= STUDENT TYPE ================= */
  const [studentType, setStudentType] = useState(""); // "vsb" | "other"

  const isVSBStudent = studentType === "vsb";
  const feePerPerson = isVSBStudent ? 150 : 300;

  /* ================= TEAM ================= */
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);

  const validMembers = members.filter(m => m.trim() !== "");
  const participantCount =
    event.type === "team" ? validMembers.length + 1 : 1;

  const canAddMember = participantCount < MAX_TEAM_SIZE;

  const addMember = () => {
    if (canAddMember) setMembers([...members, ""]);
  };

  const totalAmount = feePerPerson * participantCount;

  /* ================= NON-TECH ================= */
  const [nonTechEvents, setNonTechEvents] = useState([]);
  const [selectedNonTech, setSelectedNonTech] = useState("");

  const [submitting, setSubmitting] = useState(false);

  /* ================= GOOGLE FORM ================= */
  const googleFormBase =
    "https://docs.google.com/forms/d/e/1FAIpQLSe9UE9pCjojdIvaSMoNOQy407K_tiqa6FFu2_-VUV1N_iFMNg/viewform";

  const formLink =
    `${googleFormBase}?` +
    `entry.1041746971=${encodeURIComponent(name)}` +
    `&entry.1291792597=${encodeURIComponent(event.title)}` +
    `&entry.1362286974=${encodeURIComponent(phone)}`;

  /* ================= FETCH NON-TECH ================= */
  useEffect(() => {
    const fetchNonTech = async () => {
      const q = query(
        collection(db, "events"),
        where("category", "==", "non-technical")
      );
      const snap = await getDocs(q);
      setNonTechEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchNonTech();
  }, []);

  /* ================= DUPLICATE ================= */
  const checkDuplicate = async () => {
    const q = query(
      collection(db, "registrations"),
      where("email", "==", email),
      limit(1)
    );
    const snap = await getDocs(q);
    return !snap.empty;
  };

  /* ================= SUBMIT ================= */
  const submitForm = async () => {
    if (
      !name ||
      !email ||
      !college ||
      !department ||
      !phone ||
      !studentType
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!selectedNonTech) {
      alert("Select one Non-Technical event");
      return;
    }

    if (participantCount > MAX_TEAM_SIZE) {
      alert("Maximum team size is 3");
      return;
    }

    try {
      setSubmitting(true);

      if (await checkDuplicate()) {
        alert("This email is already registered");
        return;
      }

      await addDoc(collection(db, "registrations"), {
        studentName: name,
        email,
        phone,
        college,
        department,

        studentType,
        isVSBStudent,

        technicalEvent: event.title,
        nonTechnicalEvent: selectedNonTech,

        eventType: event.type,
        teamName: event.type === "team" ? teamName : null,

        participants: [
          { name, role: "Leader" },
          ...(event.type === "team"
            ? validMembers.map(m => ({ name: m, role: "Member" }))
            : []),
        ],

        participantCount,
        feePerPerson,
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

        <h1 className="text-red-600 text-3xl tracking-[0.25em] text-center mb-6">
          {event.title}
        </h1>

        {/* BASIC */}
        <div className="space-y-4">
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Student Name" onChange={e => setName(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="College" onChange={e => setCollege(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Department" onChange={e => setDepartment(e.target.value)} />
          <input className="w-full p-3 bg-black border border-red-600 text-white" placeholder="Phone" onChange={e => setPhone(e.target.value)} />

          {/* STUDENT TYPE */}
          <select
            className="w-full p-3 bg-black border border-red-600 text-white"
            value={studentType}
            onChange={e => setStudentType(e.target.value)}
          >
            <option value="">Select Student Type</option>
            <option value="vsb">VSB College Student (₹150)</option>
            <option value="other">Other College Student (₹300)</option>
          </select>
        </div>

        {/* TEAM */}
        {event.type === "team" && (
          <div className="mt-8">
            <h3 className="text-red-500 tracking-widest mb-2">
              TEAM DETAILS (Max 3)
            </h3>

            <input
              className="w-full p-3 mb-3 bg-black border border-red-600 text-white"
              placeholder="Team Name"
              onChange={e => setTeamName(e.target.value)}
            />

            {members.map((_, i) => (
              <input
                key={i}
                className="w-full p-3 mb-2 bg-black border border-red-600 text-white"
                placeholder={`Member ${i + 2} Name`}
                onChange={e => {
                  const copy = [...members];
                  copy[i] = e.target.value;
                  setMembers(copy);
                }}
              />
            ))}

            <button
              disabled={!canAddMember}
              onClick={addMember}
              className={`text-sm underline ${
                canAddMember ? "text-red-500" : "text-gray-500"
              }`}
            >
              + Add Team Member
            </button>
          </div>
        )}

        {/* NON-TECH */}
        <div className="mt-10">
          <h3 className="text-red-500 tracking-widest mb-4">
            SELECT ONE NON-TECHNICAL EVENT
          </h3>

          {nonTechEvents.map(e => (
            <label key={e.id} className="block text-gray-300 mb-2">
              <input
                type="radio"
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
            ₹{feePerPerson} × {participantCount} =
            <span className="text-red-500 ml-2">₹{totalAmount}</span>
          </p>

          <a href={event.qrLink} target="_blank" rel="noreferrer" className="block text-red-500 underline mb-4">
            Open Payment QR
          </a>

          <a href={formLink} target="_blank" rel="noreferrer"
            className="block text-center py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black">
            Upload Payment Screenshot
          </a>
        </div>

        <button
          disabled={submitting}
          onClick={submitForm}
          className="w-full mt-10 py-4 border border-red-600 text-red-500 tracking-[0.3em] hover:bg-red-600 hover:text-black disabled:opacity-50"
        >
          CONFIRM REGISTRATION
        </button>
      </div>
    </section>
  );
}

export default Register;
