const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌺 Hawaii Memory Game Server 🌺");
});

app.post("/add-user", (req, res) => {});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
