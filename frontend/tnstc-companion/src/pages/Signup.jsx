import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const signupUser = async () => {
    await axios.post("http://localhost:4000/auth/signup", {
      name, email, password
    });

    navigate("/login");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Account</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={signupUser}>Sign Up</button>
    </div>
  );
}
