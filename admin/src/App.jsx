import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
export default function App() {
  const [status, setStatus] = useState(1);
  const [time, setTime] = useState(5);
  const [manualTime, setManualTime] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:3000"); // replace with your server URL

    socket.on("new-data", (data) => {
      console.log(data);
      setStatus(data.status);
    });
  }, []);
  const setNotAvailable = async () => {
    console.log("running");
    const res = await fetch("http://localhost:3000/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ time: time }),
    });
    if (res.ok) {
      setStatus(false);
      setManualTime(true);
    }
  };
  const resetTime = async () => {
    console.log("running reset");
    const res = await fetch("http://localhost:3000/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ status: status }),
    });
    if (res.ok) {
      setManualTime(false);
    }
  };
  const handleInc = () => {
    setTime((time) => time + 5);
  };
  const handleDec = () => {
    if (time == 5) return;
    setTime((time) => time - 5);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      <h1>Name : yashodip kolhe</h1>
      <h2>
        Current Status:{" "}
        <span className={status ? "status-available" : "status-not-available"}>
          {status ? "Available" : "Not Available"}
        </span>
      </h2>
      <div
        style={{
          // border: "1px solid black",
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          justifyContent: "center",
          gap: 10,
          margin: "auto",
          padding: "10px",
        }}
      >
        <button className="tool" onClick={handleInc}>
          +
        </button>
        <p className="" style={{ paddingTop: "10px" }}>
          {time} minutes
        </p>
        <button className="tool" onClick={handleDec}>
          -
        </button>
      </div>
      <button
        onClick={() => {
          if (manualTime) {
            return resetTime();
          }
          setNotAvailable();
        }}
      >
        {manualTime ? "Reset Status" : "Set not Available"}
      </button>
    </div>
  );
}
