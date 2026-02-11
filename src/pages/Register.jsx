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

const MAX_TEAM_SIZE = 3; // leader + 2 members

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
  const [studentType, setStudentType] = useState("");
  const isVSBStudent = studentType === "vsb";
  const feePerPerson = isVSBStudent ? 150 : 300;

  /* ================= TEAM ================= */
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);

  const participantCount =
    event.type === "team" ? members.length + 1 : 1;

  const canAddMember = members.length < 2;

  const addMember = () => {
    if (canAddMember) {
      setMembers([...members, ""]);
    }
  };

  const removeMember = (index) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
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

  /* ================= DUPLICATE CHECK ================= */
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
    if (!name || !email || !college || !department || !phone || !studentType) {
      alert("Please fill all required fields");
      return;
    }

    if (!selectedNonTech) {
      alert("Please select one Non-Technical event");
      return;
    }

    if (participantCount > MAX_TEAM_SIZE) {
      alert("Maximum team size is 3 (1 leader + 2 members)");
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
          ...members
            .filter(m => m.trim() !== "")
            .map(m => ({ name: m, role: "Member" })),
        ],
        participantCount,
        feePerPerson,
        totalAmount,
        paymentStatus: "pending",
        createdAt: new Date(),
      });

      alert("Registration successful! Now upload payment screenshot.");
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
    <section className="min-h-screen px-4 sm:px-6 py-24 flex justify-center">
      <div className="w-full max-w-2xl bg-black/80 border border-red-700 rounded-xl p-6 sm:p-10">

        <h1 className="text-red-600 text-2xl sm:text-3xl tracking-widest text-center mb-6">
          {event.title}
        </h1>

        {/* BASIC FORM */}
        <div className="space-y-4">
          {[
            ["Student Name", setName],
            ["Email", setEmail],
            ["College", setCollege],
            ["Department", setDepartment],
            ["Phone", setPhone],
          ].map(([ph, setter], i) => (
            <input
              key={i}
              className="w-full p-3 rounded-md bg-black border border-red-600 text-white"
              placeholder={ph}
              onChange={e => setter(e.target.value)}
            />
          ))}

          <select
            className="w-full p-3 rounded-md bg-black border border-red-600 text-white"
            value={studentType}
            onChange={e => setStudentType(e.target.value)}
          >
            <option value="">Select Student Type</option>
            <option value="vsb">VSB Student (₹150)</option>
            <option value="other">Other College (₹300)</option>
          </select>
        </div>

        {/* TEAM SECTION */}
        {event.type === "team" && (
          <div className="mt-8">
            <h3 className="text-red-500 tracking-widest mb-2">
              TEAM DETAILS
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              Max 3 members (1 leader + 2 members)
            </p>

            <input
              className="w-full p-3 mb-3 rounded-md bg-black border border-red-600 text-white"
              placeholder="Team Name"
              onChange={e => setTeamName(e.target.value)}
            />

            {members.map((member, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  className="flex-1 p-3 rounded-md bg-black border border-red-600 text-white"
                  placeholder={`Member ${i + 2} Name`}
                  value={member}
                  onChange={e => {
                    const copy = [...members];
                    copy[i] = e.target.value;
                    setMembers(copy);
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeMember(i)}
                  className="px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  −
                </button>
              </div>
            ))}

            <button
              type="button"
              disabled={!canAddMember}
              onClick={addMember}
              className={`text-sm underline ${
                canAddMember
                  ? "text-red-500"
                  : "text-gray-500 cursor-not-allowed"
              }`}
            >
              + Add Team Member
            </button>
          </div>
        )}

        {/* PAYMENT SECTION */}
        <div className="mt-10 border-t border-red-700 pt-6 text-center">

          <h3 className="text-red-500 tracking-widest mb-4">
            SCAN TO PAY
          </h3>

          <p className="text-gray-300 mb-3">
            ₹{feePerPerson} × {participantCount} =
            <span className="text-red-500 ml-2 font-semibold text-lg">
              ₹{totalAmount}
            </span>
          </p>

          <div className="bg-black/70 border border-red-700 rounded-xl p-5 inline-block shadow-[0_0_30px_rgba(229,9,20,0.4)]">
            <img
              src="/payment-qr.jpg"
              alt="Payment QR"
              className="w-48 h-48 object-contain mx-auto"
            />
            <p className="text-xs text-gray-400 mt-3">
              Scan this QR to complete your payment
            </p>
          </div>

          <a
            href={formLink}
            target="_blank"
            rel="noreferrer"
            className="block mt-6 py-3 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black rounded-md transition"
          >
            Upload Payment Screenshot
          </a>
        </div>

        <button
          disabled={submitting}
          onClick={submitForm}
          className="w-full mt-10 py-4 border border-red-600 text-red-500 tracking-widest hover:bg-red-600 hover:text-black rounded-md disabled:opacity-50"
        >
          CONFIRM REGISTRATION
        </button>
      </div>
    </section>
  );
}

export default Register;
