import React, { useState } from "react";
import Swal from "sweetalert2";
import {Navigate} from 'react-router-dom';

const Login = () => {
  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    setLoading(true);
    e.preventDefault();

    const resp = await fetch(`${API}user/login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
    });

    const data = await resp.json();

    if (data.success) {
      Swal.fire({
        title: data.message,
        text: "Confirm!",
        icon: 'success'
      });
      setUsername('');
      setPassword('');
      setRedirect(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.message,
      });
    }
    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={'/'} />
  };

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="Username"
      />
      <input
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button>{loading ? 'Loading...' : 'Login'}</button>
    </form>
  );
};

export default Login;
