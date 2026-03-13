const express = require("express");

const app = express();
const PORT = 8081;

app.get("/", (req,res)=>{
  res.send("User Service Running");
});

app.listen(PORT, ()=>{
  console.log(`User service running on port ${PORT}`);
});