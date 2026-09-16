const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mock list of users with the required attributes:
// LastName, FirstName, Email, Password
const users = [
  {
    LastName: "Alvarez",
    FirstName: "Christian Ray",
    Email: "christianray.alvarez@example.com",
    Password: "P@ssw0rd123"
  },
  {
    LastName: "Wong",
    FirstName: "Samting",
    Email: "samting.wong@example.com",
    Password: "wong@2026"
  },
  {
    LastName: "Fukikho",
    FirstName: "Cathy",
    Email: "cathy.fukikho@example.com",
    Password: "macathy1"
  },
  {
    LastName: "Romualdez",
    FirstName: "Martin",
    Email: "m.romualdez@example.com",
    Password: "emergencyd@w"
  },
  {
    LastName: "Doe",
    FirstName: "John",
    Email: "j.doe@example.com",
    Password: "jd_2026"
  }
];

// Root route - simple health check / info message
app.get("/", (req, res) => {
  res.json({
    message: "Users API is running.",
    endpoint: "/users",
    method: "GET",
    description: "Returns a list of users with LastName, FirstName, Email, and Password"
  });
});

// Main endpoint required by the activity
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Users API listening on port ${PORT}`);
});