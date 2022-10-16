require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));


const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.error("Error connecting to Mongo", err);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
