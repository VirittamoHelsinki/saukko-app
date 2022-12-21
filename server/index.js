const express = require("express");
const index = express();

index.get("/", (req, res) => {
  res.send("...");
});

index.listen(3001, () => {
  console.log("Server running on port 3001");
});
