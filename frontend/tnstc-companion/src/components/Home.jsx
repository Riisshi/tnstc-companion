import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <div style={{ 
      padding: "40px 20px", 
      textAlign: "center",
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: "#2c3e50", 
        marginBottom: "30px",
        fontSize: "2.5rem"
      }}>
        🚌 Welcome to TNSTC Companion
      </h1>
      
      <p style={{ 
        fontSize: "1.2rem", 
        color: "#555",
        marginBottom: "40px",
        lineHeight: "1.6"
      }}>
        Your trusted partner for seamless bus travel across Tamil Nadu. 
        Book tickets, track your bookings, and manage refunds with ease.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3>🎫 Easy Booking</h3>
          <p>Book bus tickets in just a few clicks with secure payment processing.</p>
        </div>
        
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3>📱 Live Tracking</h3>
          <p>Track your bookings and refund status in real-time.</p>
        </div>
        
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3>🔒 Secure Payments</h3>
          <p>Razorpay integrated secure payment gateway for safe transactions.</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        {!isAuthenticated ? (
          <div>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                margin: '0 10px',
                fontWeight: 'bold'
              }}
            >
              Login to Get Started
            </button>
            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                margin: '0 10px',
                fontWeight: 'bold'
              }}
            >
              Create Account
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate('/search')}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                background: '#e44d26',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                margin: '0 10px',
                fontWeight: 'bold'
              }}
            >
              Book Bus Tickets
            </button>
            <button
              onClick={() => navigate('/history')}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                margin: '0 10px',
                fontWeight: 'bold'
              }}
            >
              View My Bookings
            </button>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#e8f4fd',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3>🚀 Quick Actions</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/search')} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Search Buses
          </button>
          <button onClick={() => navigate('/history')} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Booking History
          </button>
          <button onClick={() => navigate('/refund')} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Refund Tracker
          </button>
        </div>
      </div>
    </div>
  );
}