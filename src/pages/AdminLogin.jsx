import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black border border-red-600 p-8 rounded-xl w-96">
        <h1 className="text-red-600 text-3xl mb-6 text-center">
          Admin Login
        </h1>

        <input
          className="w-full p-2 mb-3 bg-black border border-red-600"
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-5 bg-black border border-red-600"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full border border-red-600 py-2 text-red-500 hover:bg-red-600 hover:text-black"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
