const express = require("express");
require("dotenv").config();
const cors = require("cors");

const rotas = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("aplicação rodando na porta:", { port });
});
