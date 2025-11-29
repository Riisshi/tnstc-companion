import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const signupUser = async () => {
    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", {
        name, 
        email, 
        password,
        phone: phone || undefined
      });

      if (res.data.success) {
        alert("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      signupUser();
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: '400px', margin: '0 auto' }}>
      <h2>Create Account</h2>
      <input 
        placeholder="Full Name *" 
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input 
        placeholder="Email *" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input 
        type="password" 
        placeholder="Password * (min 6 characters)" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input 
        placeholder="Phone (optional)" 
        value={phone}
        onChange={e => setPhone(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button 
        onClick={signupUser} 
        disabled={loading}
        style={{ width: '100%', padding: '10px' }}
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p 
        onClick={() => navigate("/login")} 
        style={{ cursor: "pointer", textAlign: 'center', marginTop: '20px' }}
      >
        Already have an account? Login here
      </p>
    </div>
  );
}