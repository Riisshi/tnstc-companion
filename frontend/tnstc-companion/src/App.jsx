import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Search from "./components/Search.jsx";
import Seats from "./components/Seats.jsx";
import History from "./pages/History.jsx";
import Confirmation from "./components/Confirmation.jsx";
import RefundTracker from "./components/RefundTracker.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    // Set up axios interceptor for auth tokens
    const token = localStorage.getItem('authToken');
    if (token) {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <>
      <nav style={{ display: "flex", gap: "20px", margin: "20px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/search">Search Buses</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/history">Booking History</Link>
            <Link to="/refund">Refund Tracker</Link>
            <button 
              onClick={handleLogout}
              style={{ 
                marginLeft: 'auto', 
                padding: '5px 10px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/seats" element={<Seats />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/history" element={<History />} />
        <Route path="/refund" element={<RefundTracker />} />
      </Routes>
    </>
  );
}