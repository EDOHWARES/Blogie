import React, { useState } from "react";
import Swal from "sweetalert2";

const Register = () => {
  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();

    const resp = await fetch(`${API}user/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await resp.json();

    if (data.success) {
      Swal.fire({
        title: data.message,
        text: "Confirm!",
        icon: "success",
      });
      setUsername("");
      setPassword("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.message,
      });
    }
    setLoading(false);
  };

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button>{loading ? "Loading..." : "Register"}</button>
    </form>
  );
};

export default Register;
