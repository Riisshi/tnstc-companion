import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/booking/all")
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

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
            borderRadius: "8px"
          }}
        >
          <h3>{b.busName}</h3>
          <p>Route: {b.from} → {b.to}</p>
          <p>Date: {b.date}</p>
          <p>Seat: {b.seat}</p>
          <p>Payment ID: {b.paymentId}</p>
          <p>Amount: ₹{b.amount}</p>
        </div>
      ))}
    </div>
  );
}
