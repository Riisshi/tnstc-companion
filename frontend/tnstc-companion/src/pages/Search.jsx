import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const dummyBuses = [
    { id: 1, name: "TNSTC Express", time: "8:00 AM", seats: 42 },
    { id: 2, name: "Ultra Deluxe", time: "11:00 AM", seats: 20 },
    { id: 3, name: "AC Seater", time: "4:30 PM", seats: 30 },
  ];

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }

    navigate("/seats", {
      state: {
        from,
        to,
        date,
        buses: dummyBuses,
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Buses</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>From: </label>
        <input 
          type="text" 
          value={from} 
          onChange={(e) => setFrom(e.target.value)} 
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>To: </label>
        <input 
          type="text" 
          value={to} 
          onChange={(e) => setTo(e.target.value)} 
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Date: </label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      <button onClick={handleSearch}>Search Buses</button>
    </div>
  );
}
