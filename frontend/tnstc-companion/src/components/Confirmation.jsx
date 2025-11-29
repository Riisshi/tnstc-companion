import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  if (!state) return <h2>No booking selected</h2>;

  const { bus, seat, from, to, date, amount = 500 } = state;

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const handlePayment = async () => {
    try {
      // Check if user is authenticated
      const token = getAuthToken();
      if (!token) {
        alert('Please login to continue with booking');
        navigate('/login');
        return;
      }

      // Step 1: Create Razorpay order
      const orderRes = await axios.post(
        "http://localhost:4000/api/payments/create-order",
        { amount: amount },
        { headers: getAuthHeaders() }
      );

      if (!orderRes.data.success) {
        throw new Error('Failed to create payment order');
      }

      const orderData = orderRes.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "TNSTC Companion",
        description: `Bus Ticket: ${from} to ${to}`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Step 2: Create booking after successful payment
            const bookingData = {
              busName: bus.name,
              from,
              to,
              date,
              seat: parseInt(seat),
              amount: amount,
              paymentId: response.razorpay_payment_id
            };

            const bookingRes = await axios.post(
              "http://localhost:4000/api/bookings",
              bookingData,
              { headers: getAuthHeaders() }
            );

            if (bookingRes.data.success) {
              alert(`Payment Successful! Booking confirmed. PNR: ${bookingRes.data.data.pnr}`);
              // Navigate to history page to see the booking
              navigate('/history');
            }
          } catch (bookingError) {
            console.error('Booking creation failed:', bookingError);
            alert('Payment successful but booking creation failed. Please contact support with your payment ID.');
          }
        },
        prefill: {
          name: "Passenger Name", // You can get this from user data later
          email: "passenger@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Handle payment failure
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}. Please try again.`);
      });

    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert(error.response?.data?.error || 'Failed to initialize payment. Please try again.');
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: '600px', margin: '0 auto' }}>
      <h2>Booking Confirmation</h2>
      
      <div style={{
        border: '2px solid #4caf50',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#4caf50', marginTop: 0 }}>{bus.name}</h3>
        <p><strong>Route:</strong> {from} → {to}</p>
        <p><strong>Date of Travel:</strong> {date}</p>
        <p><strong>Selected Seat:</strong> {seat}</p>
        <p><strong>Total Amount:</strong> ₹{amount}</p>
      </div>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "12px 30px",
          fontSize: "16px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 'bold'
        }}
      >
        Pay ₹{amount}
      </button>

      <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
        You will be redirected to Razorpay for secure payment
      </p>
    </div>
  );
}