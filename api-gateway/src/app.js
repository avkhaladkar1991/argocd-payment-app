const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8080;

app.use(express.json());

// USER SERVICE
app.get("/users", async (req, res) => {
  const response = await axios.get("http://user-service:8081");
  res.send(response.data);
});

// PRODUCT SERVICE
app.get("/products", async (req, res) => {
  const response = await axios.get("http://product-service:8082/products");
  res.send(response.data);
});

// ORDER SERVICE
app.post("/order", async (req, res) => {
  const response = await axios.post("http://order-service:8083/order", req.body);
  res.send(response.data);
});

// PAYMENT SERVICE
app.post("/payment", async (req, res) => {
  const response = await axios.post("http://payment-service:8084/pay", req.body);
  res.send(response.data);
});

// NOTIFICATION SERVICE
app.post("/notify", async (req, res) => {
  const response = await axios.post("http://notification-service:8085/notify", req.body);
  res.send(response.data);
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});