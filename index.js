const express = require("express");
const uuid = require("uuid");

const app = express();

const channelsRoute = require("./api/routes/channels");
const lessonsRoute = require("./api/routes/lessons");
//
//parse JSON Objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
// Middleware Main Route
app.get("/", (req, res) => {
  res.status(200).json({
    Homepage: "Welcome to the base ROUTE",
  });
});

//
//Middleware Routes
app.use("/api", channelsRoute);
app.use("/api", lessonsRoute);
//
//Creating Server and Listening PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n*** Listening on PORT ${PORT} ***`);
});

app.post("/", (req, res) => {});
