// agent/agent.ts
import { ClaimCheckResult } from "../types/ClaimCheckResult";

export async function validateClaim(claim: string): Promise<ClaimCheckResult> {
  // TODO: Replace with real LLM + evidence lookup later
  return {
    isFactual: false,
    evidence: [
      "No scientific evidence supports that Vitamin C cures cancer.",
      "NIH and Mayo Clinic articles refute this claim."
    ],
    explanation: "This claim is widely debunked. Vitamin C is not an established cancer cure."
  };
}
