const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const path = require("path");
const nodemon = require("nodemon");
dotenv.config();
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const route = require("./routes/index");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//port
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Problem:", err);
    return;
  }
  console.log(`Port runnung ${process.env.PORT}`);
});
dbConnect();
// app environment start######

let allowedOrigins = [];

if (process.env.NODE_ENV === "development") {
  allowedOrigins = [`${process.env.CLIENT_URL}`];
} else {
  allowedOrigins = [`${process.env.CLIENT_URL}`];
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

// app environment end######
app.get("/", (req, res) => {
  res.render("index", { title: "My App" });
});
app.use(route);
app.use(errorHandler);
