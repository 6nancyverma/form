const express = require("express");
const app = express();

app.post("/submit-form", (req, res) => {
  res.send("Form submitted successfully");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
