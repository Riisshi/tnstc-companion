import { useState } from "react";
import axios from "axios";

export default function RefundTracker() {
  const [pnr, setPnr] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const handleCheck = async () => {
    if (!pnr.trim()) {
      alert("Please enter your PNR number");
      return;
    }

    // Check authentication
    if (!localStorage.getItem('authToken')) {
      alert("Please login to check refund status");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/payments/refund/${pnr.trim()}`,
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        setStatus(res.data.data);
      }
    } catch (err) {
      console.error("Refund check error:", err);
      if (err.response?.status === 404) {
        setStatus({ error: "PNR not found or refund not initiated" });
      } else if (err.response?.status === 401) {
        setStatus({ error: "Please login to check refund status" });
      } else {
        setStatus({ error: err.response?.data?.error || "Failed to fetch refund status" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: '600px', margin: '0 auto' }}>
      <h2>Refund Status Tracker</h2>

      <div style={{ marginTop: "30px" }}>
        <label><strong>Enter PNR Number: </strong></label>
        <input 
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter your booking PNR"
          style={{ 
            marginLeft: "10px", 
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "200px"
          }}
        />
        <button 
          onClick={handleCheck} 
          disabled={loading}
          style={{ 
            marginLeft: "20px", 
            padding: "8px 16px",
            background: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      {status && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: status.error ? "#ffe6e6" : "#e6f7ff"
          }}
        >
          {status.error ? (
            <div style={{ color: "#d63031" }}>
              <h4>Error</h4>
              <p>{status.error}</p>
            </div>
          ) : (
            <div style={{ color: "#2d3436" }}>
              <h4 style={{ color: "#0984e3", marginTop: 0 }}>Refund Details</h4>
              <p><strong>PNR:</strong> {status.pnr}</p>
              <p><strong>Status:</strong> 
                <span style={{ 
                  color: status.status === 'processed' ? '#00b894' : 
                         status.status === 'pending' ? '#fdcb6e' : '#e17055',
                  fontWeight: 'bold',
                  marginLeft: '8px'
                }}>
                  {status.status?.toUpperCase()}
                </span>
              </p>
              <p><strong>Amount:</strong> ₹{status.amount}</p>
              {status.processedAt && (
                <p><strong>Processed At:</strong> {new Date(status.processedAt).toLocaleString()}</p>
              )}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h4>Note:</h4>
        <ul>
          <li>Enter the PNR number from your booking confirmation</li>
          <li>Refunds may take 5-7 business days to process</li>
          <li>You must be logged in to check refund status</li>
        </ul>
      </div>
    </div>
  );
}