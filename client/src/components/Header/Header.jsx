import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const API = import.meta.env.VITE_API_URL;
  const {userInfo, setUserInfo} = useContext(UserContext);
  const username = userInfo?.username

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API}user/profile`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserInfo(data); // Set the username from response data
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserInfo(null); // Set username to null if there's an error
      }
    }

    fetchData();
  }, [API]);

  const logout = async () => {
    try {
      const resp = await fetch(`${API}user/logout`, {
        credentials: 'include',
        method: 'POST',
      });
      const data = await resp.json();
      setUserInfo(null);
    } catch (error) {
      
    }
  }

  return (
    <>
      <header>
        <Link to={"/"} className="logo">
          <span>
            <img src={logo} alt="logo img" />
          </span>
          <span>Blogie</span>
        </Link>
        <nav>
          {username ? (
            <>
              <Link className="btn" to={"/create"}>Create new post</Link>
              <a className="btn" style={{cursor: 'pointer'}} onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="btn">Login</button>
              </Link>
              <Link to={"/register"}>
                <button className="btn">Register</button>
              </Link>
            </>
          )}
        </nav>
      </header>
      {username && (
        <div className="username">
          <p>Welcome, {username}</p>
        </div>
      )}
    </>
  );
};

export default Header;
