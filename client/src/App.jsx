import React from "react";
import './App.css';
import logo from './assets/logo.png';

import Post from "./components/Post";

const App = () => {
  return (
    <main>
      <header>
        <a href="" className="logo">
          <span><img src={logo} alt="logo img" /></span>
          <span>Blogie</span>
        </a>
        <nav>
          <button>Login</button>
          <button>Register</button>
        </nav>
      </header>

      <div className="posts">
       <Post />
       <Post />
       <Post />
      </div>
    </main>
  );
};

export default App;
