const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("aplicação rodando na porta:", { port });
});
