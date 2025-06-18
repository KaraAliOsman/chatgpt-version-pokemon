// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 1️⃣  Línea de depuración (colócala aquí, sola)
console.log("GEMINI ==> ", import.meta.env.VITE_GEMINI_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
