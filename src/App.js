import React from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
