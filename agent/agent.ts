import axios from "axios";

export async function validateClaim(claim: string) {
  const prompt = `Fact check the following health claim using trustworthy sources like PubMed and explain your answer with reasoning and supporting evidence:\n\n"${claim}"`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt,
      stream: false
    });

    const data = response.data as { response: string };
    const rawOutput: string = data.response;

    // You can replace this with guardrails later if needed
    return {
      isFactual: /true|yes/i.test(rawOutput), // naive keyword match
      explanation: rawOutput,
      evidence: [],
      confidence: undefined
    };
  } catch (err) {
    console.error("Error querying Ollama:", err);
    throw new Error("Ollama failed to respond");
  }
}