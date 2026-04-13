import Navbar from "../components/Navbar";
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Hook this up to backend");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Message"
            onChange={handleChange}
            value={form.message}
            className="w-full border p-3 rounded-lg"
            rows={5}
          />

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;