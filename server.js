const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HiperMove running on http://localhost:${PORT}`));