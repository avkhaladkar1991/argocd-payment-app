const express = require("express");

const app = express();
const PORT = 8085;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

app.post("/notify", (req, res) => {
  const { message } = req.body;

  console.log("Sending notification:", message);

  res.json({
    status: "Notification sent",
    message: message
  });
});

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});