import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    const res = await axios.post("http://localhost:4000/auth/login", {
      email, password
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);

    setTimeout(() => navigate("/search"), 50);

  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={loginUser}>Login</button>

      <p onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
        Create an account
      </p>
    </div>
  );
}
