import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:4000/api/bookings/my-bookings",
          { headers: getAuthHeaders() }
        );

        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        if (error.response?.status === 401) {
          alert("Please login to view your bookings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading your bookings...</h2>;
  }

  if (!localStorage.getItem('authToken')) {
    return <h2 style={{ padding: "20px" }}>Please login to view your booking history</h2>;
  }

  if (bookings.length === 0) {
    return <h2 style={{ padding: "20px" }}>No bookings yet</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booking History</h2>

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "15px 0",
            borderRadius: "8px",
            backgroundColor: '#f9f9f9'
          }}
        >
          <h3>{b.busName}</h3>
          <p><strong>Route:</strong> {b.from} → {b.to}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Seat:</strong> {b.seat}</p>
          <p><strong>PNR:</strong> {b.pnr}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <p><strong>Amount:</strong> ₹{b.amount}</p>
          <p><strong>Payment ID:</strong> {b.paymentId || 'N/A'}</p>
          <p><strong>Booked on:</strong> {new Date(b.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}