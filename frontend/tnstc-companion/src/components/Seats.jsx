import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Seats() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;
  if (!data) return <h2>No bus selected. Please search for buses first.</h2>;

  const buses = data.buses;
  const [selectedBus, setSelectedBus] = useState(buses[0]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Create 40 seats example
  const totalSeats = selectedBus.seats;
  const seatLayout = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const handleBusSelect = (bus) => {
    setSelectedBus(bus);
    setSelectedSeat(null); // Reset seat selection when bus changes
  };

  const handleSeatClick = (num) => {
    setSelectedSeat(num);
  };

  const handleProceed = () => {
    if (!selectedSeat) {
      alert("Please select a seat to continue");
      return;
    }

    if (!localStorage.getItem("authToken")) {
      alert("Please login to book a seat");
      navigate("/login");
      return;
    }

    navigate("/confirmation", {
      state: {
        bus: selectedBus,
        seat: selectedSeat,
        from: data.from,
        to: data.to,
        date: data.date,
        amount: selectedBus.fare
      }
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: '800px', margin: '0 auto' }}>
      <h2>Select Bus & Seat</h2>
      
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <p><strong>Route:</strong> {data.from} → {data.to}</p>
        <p><strong>Date:</strong> {data.date}</p>
      </div>

      {/* Bus Selection */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Available Buses</h3>
        {buses.map(bus => (
          <div
            key={bus.id}
            onClick={() => handleBusSelect(bus)}
            style={{
              border: `2px solid ${selectedBus.id === bus.id ? '#4caf50' : '#ddd'}`,
              padding: '15px',
              margin: '10px 0',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedBus.id === bus.id ? '#e8f5e8' : 'white'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0' }}>{bus.name}</h4>
            <p style={{ margin: '5px 0' }}><strong>Departure:</strong> {bus.time}</p>
            <p style={{ margin: '5px 0' }}><strong>Type:</strong> {bus.type}</p>
            <p style={{ margin: '5px 0' }}><strong>Seats Available:</strong> {bus.seats}</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#e44d26' }}>
              <strong>Fare:</strong> ₹{bus.fare}
            </p>
          </div>
        ))}
      </div>

      {/* Seat Selection */}
      <div>
        <h3>Select Your Seat - {selectedBus.name}</h3>
        <p>Available Seats: {selectedBus.seats}</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 70px)",
          gap: "15px",
          marginTop: "20px",
          justifyContent: 'center'
        }}>
          {seatLayout.map(num => (
            <div
              key={num}
              onClick={() => handleSeatClick(num)}
              style={{
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: `2px solid ${selectedSeat === num ? '#4caf50' : '#333'}`,
                background: selectedSeat === num ? "#4caf50" : "#f0f0f0",
                color: selectedSeat === num ? "white" : "black",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {selectedSeat && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            border: '2px solid #4caf50',
            borderRadius: '8px',
            backgroundColor: '#e8f5e8'
          }}>
            <p><strong>Selected Seat:</strong> {selectedSeat}</p>
            <p><strong>Bus:</strong> {selectedBus.name}</p>
            <p><strong>Total Fare:</strong> ₹{selectedBus.fare}</p>
          </div>
        )}

        <button
          onClick={handleProceed}
          disabled={!selectedSeat}
          style={{
            marginTop: "30px",
            padding: "12px 30px",
            fontSize: "16px",
            background: selectedSeat ? "#4caf50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: selectedSeat ? "pointer" : "not-allowed",
            fontWeight: 'bold'
          }}
        >
          {selectedSeat ? `Proceed to Pay ₹${selectedBus.fare}` : "Select a Seat"}
        </button>
      </div>
    </div>
  );
}