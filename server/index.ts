// server/index.ts
console.log("🔍 Starting server...");

import express from "express";
import cors from "cors";
import { validateClaim } from "../agent/agent";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/check", async (req, res) => {
  const { claim } = req.body;

  try {
    const result = await validateClaim(claim);
    res.json(result);
  } catch (error) {
    console.error("Error validating claim:", error);
    res.status(500).json({ error: "Failed to validate claim" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});