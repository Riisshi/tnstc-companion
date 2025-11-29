import { useEffect, useState } from "react";
import axios from "axios";

export default function RefundTracker() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("authToken")}`
  });

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/refunds/my-refunds",
          { headers: getAuthHeaders() }
        );

        if (res.data.success) {
          setRefunds(res.data.data);
        }
      } catch (err) {
        console.error("Refund fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  if (loading) return <h2 style={{ padding: 20 }}>Loading refunds...</h2>;

  if (refunds.length === 0) {
    return <h2 style={{ padding: 20 }}>No refund activity found</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My Refunds</h2>

      {refunds.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            margin: "15px 0",
            borderRadius: 8,
            backgroundColor: "#f9f9f9"
          }}
        >
          <p><strong>PNR:</strong> {r.pnr}</p>
          <p><strong>Amount:</strong> ₹{r.amount}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                fontWeight: "bold",
                color:
                  r.status === "processed"
                    ? "#00c853"
                    : r.status === "pending"
                    ? "#ffab00"
                    : "#d50000"
              }}
            >
              {r.status.toUpperCase()}
            </span>
          </p>

          <p>
            <strong>Requested:</strong>{" "}
            {new Date(r.requestedAt).toLocaleString()}
          </p>

          {r.processedAt && (
            <p>
              <strong>Processed:</strong>{" "}
              {new Date(r.processedAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
