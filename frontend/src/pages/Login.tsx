import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Login = () => {
  const { logged, login } = useAuth(); 
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      login(data.token); 
      navigate("/");

    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      login(data.token);
      navigate("/");

    } catch (err: any) {
      alert(err.message || "Register failed");
    }
  };

  if (logged) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-lg">
          You are already logged in
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md border rounded-xl p-8 shadow-sm bg-white">

          <h1 className="text-2xl font-semibold text-center mb-6">
            {isLogin ? "Login" : "Create Account"}
          </h1>

          <div className="space-y-4">

            {!isLogin && (
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
            />

            <button
              onClick={isLogin ? handleLogin : handleRegister}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

          <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-center text-gray-600 mt-6 cursor-pointer hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;