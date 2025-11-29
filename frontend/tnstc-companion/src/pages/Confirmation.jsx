import { useLocation } from "react-router-dom";
import axios from "axios";


export default function Confirmation() {
  const { state } = useLocation();
  if (!state) return <h2>No booking selected</h2>;

  const { bus, seat, from, to, date } = state;

  const handlePayment = async () => {
    const orderRes = await axios.post("http://localhost:4000/create-order", {
      amount: 200, // ₹200 test price
    });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // replace with your key
      amount: orderRes.data.amount,
      currency: orderRes.data.currency,
      name: "TNSTC Companion",
      description: "Test Ticket Payment",
      order_id: orderRes.data.id,

      handler: function (response) {
        alert(
          "Payment Successful!\nPayment ID: " + response.razorpay_payment_id
        );
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booking Summary</h2>

      <h3>{bus.name}</h3>
      <p>
        Route: {from} → {to}
      </p>
      <p>Date: {date}</p>
      <p>Seat Number: {seat}</p>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Pay ₹200
      </button>
    </div>
  );
}
