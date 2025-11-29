import { useState } from "react";
import axios from "axios";

export default function RefundTracker() {
  const [pnr, setPnr] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheck = async () => {
    if (!pnr) {
      alert("Enter your PNR number");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/refund/${pnr}`);
      setStatus(res.data);
    } catch (err) {
      setStatus({ error: "PNR not found" });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Refund Status Tracker</h2>

      <div style={{ marginTop: "20px" }}>
        <label>Enter PNR Number: </label>
        <input 
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={handleCheck} style={{ marginLeft: "20px" }}>
          Check
        </button>
      </div>

      {status && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px"
          }}
        >
          {status.error ? (
            <p style={{ color: "red" }}>{status.error}</p>
          ) : (
            <>
              <p><b>PNR:</b> {status.pnr}</p>
              <p><b>Status:</b> {status.status}</p>
              <p><b>Amount:</b> ₹{status.amount}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
