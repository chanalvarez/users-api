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

// Helper: read a field regardless of key casing (Email / email, etc.)
function pick(body, ...keys) {
  for (const k of keys) {
    if (body && body[k] !== undefined && body[k] !== null) return String(body[k]).trim();
  }
  return "";
}

// REGISTER
app.post("/auth/register", (req, res) => {
  let first = pick(req.body, "FirstName", "firstName");
  let last = pick(req.body, "LastName", "lastName");
  const full = pick(req.body, "FullName", "fullName", "name");
  const email = pick(req.body, "Email", "email");
  const password = pick(req.body, "Password", "password");

  // Your register screen has one "Full name" field, so split it
  if (!first && full) {
    const parts = full.split(" ");
    last = parts.length > 1 ? parts.pop() : "";
    first = parts.join(" ");
  }

  if (!first || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email and password are required." });
  }
  if (users.some(u => u.Email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ success: false, message: "Email is already registered." });
  }

  users.push({ LastName: last, FirstName: first, Email: email, Password: password });
  res.status(201).json({ success: true, message: "Registration successful." });
});

// LOGIN
app.post("/auth/login", (req, res) => {
  const email = pick(req.body, "Email", "email");
  const password = pick(req.body, "Password", "password");

  const user = users.find(
    u => u.Email.toLowerCase() === email.toLowerCase() && u.Password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }
  res.status(200).json({
    success: true,
    message: "Login successful.",
    FirstName: user.FirstName,
    LastName: user.LastName,
    Email: user.Email
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Users API listening on port ${PORT}`);
});
