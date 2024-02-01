const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require("./routes/user");

app.get("/", (req, res) => {
  res.send("Hey this is my API running 22 🥳");
});

app.use("/user", userRoute);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connection successful");
    });
  })
  .catch((err) => {
    console.log("Connection Failed!");
  });
