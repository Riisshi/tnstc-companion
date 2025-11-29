import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email, 
        password
      });

      if (res.data.success) {
        // Store token and user data as per backend response
        localStorage.setItem("authToken", res.data.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.data.user));
        
        alert("Login successful!");
        navigate("/search");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginUser();
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <input 
        placeholder="Email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button 
        onClick={loginUser} 
        disabled={loading}
        style={{ width: '100%', padding: '10px' }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p 
        onClick={() => navigate("/signup")} 
        style={{ cursor: "pointer", textAlign: 'center', marginTop: '20px' }}
      >
        Don't have an account? Sign up here
      </p>
    </div>
  );
}