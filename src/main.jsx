import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import YouthRomanceGamePage from "./pages/YouthRomanceGamePage.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        {/* The game page is now a separate, top-level route for a full-screen experience */}
        <Route path="learn/romance" element={<YouthRomanceGamePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
