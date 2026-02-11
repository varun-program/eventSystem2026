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

  /* ================= STATES ================= */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  const [studentType, setStudentType] = useState("");
  const isVSBStudent = studentType === "vsb";
  const feePerPerson = isVSBStudent ? 150 : 300;

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);

  const [nonTechEvents, setNonTechEvents] = useState([]);
  const [selectedNonTech, setSelectedNonTech] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const participantCount =
    event.type === "team" ? members.length + 1 : 1;

  const totalAmount = feePerPerson * participantCount;

  /* ================= FETCH NON TECH ================= */
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

  /* ================= TEAM FUNCTIONS ================= */
  const addMember = () => {
    if (members.length < 2) setMembers([...members, ""]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

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

  /* ================= CONFIRM REGISTER ================= */
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
      alert("Maximum 3 members allowed");
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
          ...members.map(m => ({ name: m, role: "Member" })),
        ],
        participantCount,
        feePerPerson,
        totalAmount,
        paymentStatus: "pending",
        createdAt: new Date(),
      });

      // ✅ Instead of new tab — open modal
      setShowFormModal(true);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSe9UE9pCjojdIvaSMoNOQy407K_tiqa6FFu2_-VUV1N_iFMNg/viewform";

  return (
    <section className="min-h-screen px-4 py-24 flex justify-center">
      <div className="w-full max-w-2xl bg-black/80 border border-red-700 rounded-xl p-8 shadow-xl">

        <h1 className="text-red-600 text-2xl text-center mb-8 tracking-widest">
          {event.title}
        </h1>

        {/* BASIC */}
        <div className="space-y-4">
          {[["Student Name", setName],
            ["Email", setEmail],
            ["College", setCollege],
            ["Department", setDepartment],
            ["Phone", setPhone]
          ].map(([ph, setter], i) => (
            <input
              key={i}
              className="w-full p-3 bg-black border border-red-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder={ph}
              onChange={e => setter(e.target.value)}
            />
          ))}

          <select
            className="w-full p-3 bg-black border border-red-600 rounded-md text-white"
            value={studentType}
            onChange={e => setStudentType(e.target.value)}
          >
            <option value="">Select Student Type</option>
            <option value="vsb">VSB Student (₹150)</option>
            <option value="other">Other College (₹300)</option>
          </select>
        </div>

        {/* NON TECH */}
        <div className="mt-8">
          <h3 className="text-red-500 mb-3">Select One Non-Technical Event</h3>
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

        {/* TEAM */}
        {event.type === "team" && (
          <div className="mt-8">
            <input
              className="w-full p-3 mb-3 bg-black border border-red-600 rounded-md text-white"
              placeholder="Team Name"
              onChange={e => setTeamName(e.target.value)}
            />

            {members.map((m, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  className="flex-1 p-3 bg-black border border-red-600 rounded-md text-white"
                  value={m}
                  placeholder={`Member ${i + 2}`}
                  onChange={e => {
                    const copy = [...members];
                    copy[i] = e.target.value;
                    setMembers(copy);
                  }}
                />
                <button
                  onClick={() => removeMember(i)}
                  className="px-3 bg-red-600 text-white rounded-md"
                >
                  −
                </button>
              </div>
            ))}

            <button
              onClick={addMember}
              disabled={members.length >= 2}
              className="text-red-500 underline text-sm"
            >
              + Add Member
            </button>
          </div>
        )}

        {/* PAYMENT DISPLAY */}
        <div className="mt-10 text-center border-t border-red-700 pt-6">
          <p>
            ₹{feePerPerson} × {participantCount} =
            <span className="text-red-500 ml-2 font-semibold">
              ₹{totalAmount}
            </span>
          </p>

          <img
            src="/payment-qr.jpg"
            alt="QR"
            className="w-40 mx-auto my-4 rounded-lg shadow-lg"
          />
        </div>

        {/* CONFIRM */}
        <button
          disabled={submitting}
          onClick={submitForm}
          className="w-full mt-8 py-3 border border-red-600 text-red-500 rounded-md hover:bg-red-600 hover:text-black transition"
        >
          Confirm Registration
        </button>
      </div>

      {/* GOOGLE FORM MODAL */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-red-600 w-[95%] md:w-[800px] h-[90vh] rounded-xl relative">

            <iframe
              src={googleFormLink}
              title="Payment Upload"
              className="w-full h-full rounded-xl"
            />

            <button
              onClick={() => {
                setShowFormModal(false);
                navigate("/events");
              }}
              className="absolute top-3 right-3 bg-red-600 px-4 py-1 rounded text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Register;
