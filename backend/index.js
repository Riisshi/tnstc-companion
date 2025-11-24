const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TNSTC Companion Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});