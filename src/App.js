import React from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyBasket from "./pages/MyBasket";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybasket" element={<MyBasket />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
