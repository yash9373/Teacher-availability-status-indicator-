import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

export default function App() {
  const [status, setStatus] = useState(1);
  useEffect(() => {
    const socket = io("http://localhost:3000"); // replace with your server URL

    socket.on("new-data", (data) => {
      console.log(data);
      setStatus(data.status);
    });

    // cleanup function
    return () => {
      socket.off("new-data");
    };
  }, []);
  return (
    <div className="container" style={{ position: "relative" }}>
      <h1 style={{ textAlign: "center" }}>User Panel</h1>
      <h1>Name : yashodip kolhe</h1>
      <h2>
        Current Status:{" "}
        <span className={status ? "status-available" : "status-not-available"}>
          {status ? "Available" : "Not Available"}
        </span>
      </h2>
      {/* <p style={{ position: "absolute", bottom: 0, fontStyle: "italic" }}>
        {"connected"}
      </p> */}
    </div>
  );
}
