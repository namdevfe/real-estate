require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const initRoutes = require("./routes/v1");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Config Middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

initRoutes(app);
connectDB();

app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
