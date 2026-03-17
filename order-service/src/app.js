const express = require("express");

const app = express();
const PORT = 8083;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Order Service Running");
});

app.post("/order", (req, res) => {
  const order = req.body;

  res.json({
    message: "Order placed successfully",
    order: order
  });
});

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});