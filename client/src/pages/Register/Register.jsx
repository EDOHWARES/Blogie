import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
    })
  };


  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
      <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button>Register</button>
    </form>
  );
};

export default Register;
