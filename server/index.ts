// server/index.ts

import express from "express";
import cors from "cors";
import { ClaimCheckResult } from "../types/ClaimCheckResult";

const app = express();
app.use(cors());

app.post("/check", async (req, res) => {
  const { claim } = req.body;

  // TODO: Wire this to real agent later
  const result: ClaimCheckResult = {
    isFactual: false,
    evidence: [
      "No scientific evidence supports that Vitamin C cures cancer.",
      "NIH and Mayo Clinic articles refute this claim."
    ],
    explanation: "This claim is widely debunked."
  };

  res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running at http://localhost:${PORT}');
});
