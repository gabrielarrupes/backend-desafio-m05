require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routes/router");

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT);
