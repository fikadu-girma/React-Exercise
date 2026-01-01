import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Fake in-memory data
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// Home route
app.get("/", (_req: Request, res: Response) => {
  res.send("TypeScript API is running 🚀");
});

// Get all users
app.get("/users", (_req: Request, res: Response) => {
  res.json(users);
});

// Get user by ID
app.get("/users/:id", (req: Request, res: Response) => {
  const user = users.find(u => u.id === Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// Create user
app.post("/users", (req: Request, res: Response) => {
  const newUser = { id: Date.now(), name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  users = users.map(u => (u.id === id ? { ...u, name: req.body.name } : u));
  res.json({ message: "User updated" });
});

// Delete user
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
