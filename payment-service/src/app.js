const express = require("express");

const app = express();
const PORT = 8084;

app.get("/", (req, res) => {
  res.send("Payment Service Running");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});