import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Seats() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;
  if (!data) return <h2>No bus selected</h2>;

  const buses = data.buses;
  const selectedBus = buses[0]; // TEMP: Always pick first bus for now

  // Create 40 seats example
  const totalSeats = 40;
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (num) => {
    setSelectedSeat(num);
  };

  const handleProceed = () => {
    if (!localStorage.getItem("token")) {
      alert("Login required to book a seat");
      navigate("/login");
      return;
    }

    navigate("/confirmation", {
      state: {
        bus: selectedBus,
        seat: selectedSeat,
        from: data.from,
        to: data.to,
        date: data.date
      }
    });
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Select Your Seat – {selectedBus.name}  
      </h2>
      <p>
        Route: {data.from} → {data.to}  
        | Date: {data.date}
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 60px)",
        gap: "15px",
        marginTop: "30px"
      }}>
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map(num => (
          <div
            key={num}
            onClick={() => handleSeatClick(num)}
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              border: "2px solid #333",
              background: selectedSeat === num ? "#4caf50" : "#eee",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {num}
          </div>
        ))}
      </div>

      <button
        onClick={handleProceed}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "16px"
        }}
      >
        Confirm Seat
      </button>
    </div>
  );
}
