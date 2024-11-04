import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={'/'} className="logo">
        <span>
          <img src={logo} alt="logo img" />
        </span>
        <span>Blogie</span>
      </Link>
      <nav>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
        <Link to={'register'}>
          <button>Register</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
