import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostPage from "./pages/PostPage/PostPage";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  ); 
};

export default App;
