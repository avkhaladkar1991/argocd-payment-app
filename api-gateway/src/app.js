const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// --------------------
// Health Check
// --------------------
app.get("/", (req, res) => {
  res.status(200).send("API Gateway is running");
});

// --------------------
// USER SERVICE
// --------------------
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("http://user-service:8081/users");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("User service error:", error.message);
    res.status(500).json({ error: "User service unavailable" });
  }
});

// --------------------
// PRODUCT SERVICE
// --------------------
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("http://product-service:8082/products");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Product service error:", error.message);
    res.status(500).json({ error: "Product service unavailable" });
  }
});

// --------------------
// ORDER SERVICE
// --------------------
app.post("/orders", async (req, res) => {
  try {
    const response = await axios.post(
      "http://order-service:8083/orders",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Order service error:", error.message);
    res.status(500).json({ error: "Order service unavailable" });
  }
});

// --------------------
// PAYMENT SERVICE
// --------------------
app.post("/payments", async (req, res) => {
  try {
    const response = await axios.post(
      "http://payment-service:8084/payments",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Payment service error:", error.message);
    res.status(500).json({ error: "Payment service unavailable" });
  }
});

// --------------------
// NOTIFICATION SERVICE
// --------------------
app.post("/notifications", async (req, res) => {
  try {
    const response = await axios.post(
      "http://notification-service:8085/notifications",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Notification service error:", error.message);
    res.status(500).json({ error: "Notification service unavailable" });
  }
});

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});