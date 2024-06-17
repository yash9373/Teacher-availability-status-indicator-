import React, { useState } from "react";
import "./App.css";
export default function App() {
  const [status, setStatus] = useState("available");

  const toggleStatus = () => {
    setStatus((prevStatus) =>
      prevStatus === "available" ? "not available" : "available"
    );
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      <h1>Name : yashodip kolhe</h1>
      <h2>
        Current Status:{" "}
        <span
          className={
            status === "available" ? "status-available" : "status-not-available"
          }
        >
          {status}
        </span>
      </h2>
      <button onClick={toggleStatus}>Toggle Status</button>
    </div>
  );
}
