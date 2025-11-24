import { useEffect } from "react";
import axios from "axios";

export default function App() {
  useEffect(() => {
    axios.get("http://localhost:4000/api/test")
      .then(res => console.log("Backend Response:", res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <h1>TNSTC Companion – Prototype Build 0.1</h1>
  );
}
