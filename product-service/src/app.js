const express = require("express");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("Product Service Running");
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mobile", price: 500 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
