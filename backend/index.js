const express = require("express");
const cors = require("cors");
require("dotenv").config();
const superheroRoutes = require("./routes/superheroRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/superheroes", superheroRoutes);

app.get("/", (req, res) => {
  res.send("Superhero API is running!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
