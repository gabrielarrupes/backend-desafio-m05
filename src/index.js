const express = require("express");
require("dotenv").config();
const cors = require("cors");

const router = require("./routes/router");

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("api sendo executada na porta:", port);
});
