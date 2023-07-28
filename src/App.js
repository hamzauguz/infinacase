import React from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyBasket from "./pages/MyBasket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyWallet from "./pages/MyWallet";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybasket" element={<MyBasket />} />
          <Route path="/mywallet" element={<MyWallet />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
