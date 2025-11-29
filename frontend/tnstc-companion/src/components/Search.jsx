import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Get tomorrow's date for min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const dummyBuses = [
    { id: 1, name: "TNSTC Express", time: "8:00 AM", seats: 42, type: "Non-AC", fare: 350 },
    { id: 2, name: "Ultra Deluxe", time: "11:00 AM", seats: 20, type: "AC", fare: 600 },
    { id: 3, name: "AC Seater", time: "4:30 PM", seats: 30, type: "AC", fare: 550 },
    { id: 4, name: "Super Fast", time: "2:15 PM", seats: 36, type: "Non-AC", fare: 400 },
  ];

  const handleSearch = () => {
    if (!from.trim() || !to.trim() || !date) {
      alert("Please fill all fields");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      alert("Source and destination cannot be the same");
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      navigate("/seats", {
        state: {
          from: from.trim(),
          to: to.trim(),
          date,
          buses: dummyBuses,
        },
      });
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: '500px', margin: '0 auto' }}>
      <h2>Search Buses</h2>

      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{ marginBottom: "20px" }}>
          <label><strong>From: </strong></label>
          <input 
            type="text" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter source city"
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>To: </strong></label>
          <input 
            type="text" 
            value={to} 
            onChange={(e) => setTo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter destination city"
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>Date of Journey: </strong></label>
          <input 
            type="date" 
            value={date} 
            min={getTomorrowDate()}
            onChange={(e) => setDate(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        <button 
          onClick={handleSearch} 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "Searching..." : "Search Buses"}
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h4>Popular Routes:</h4>
        <p>Chennai → Coimbatore | Bangalore → Chennai | Madurai → Trichy</p>
      </div>
    </div>
  );
}