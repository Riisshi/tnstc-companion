import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Seats from "./pages/Seats.jsx";
import History from "./pages/History.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import RefundTracker from "./pages/RefundTracker.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


export default function App() {
  return (
    <>
      <nav style={{ display: "flex", gap: "20px", margin: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/search">Search Buses</Link>
        <Link to="/history">Booking History</Link>
        <Link to="/refund">Refund Tracker</Link>
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
