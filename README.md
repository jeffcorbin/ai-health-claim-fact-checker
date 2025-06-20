# AI Health Claim Fact Checker

An AI-powered application that helps you verify the factual accuracy of health-related claims by scraping real-world data sources, retrieving trusted evidence (PubMed, Wikipedia), and using a local LLM (via [Ollama](https://ollama.com)) to analyze and explain the claim. You can also provide feedback (correct/incorrect) to continuously improve the system.

---

## 🚀 Quick Start

### Prerequisites

* **Node.js** (v16+)
* **npm** (v8+)
* [**Ollama**](https://ollama.com/download) installed locally (Mac, Linux, or WSL on Windows)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-health-claim-fact-checker.git
cd ai-health-claim-fact-checker
```

### 2. Install Dependencies

Install backend and frontend dependencies:

```bash
# From the project root
npm install
cd ui && npm install
```

### 3. Add Required Config Files

Make sure these files exist in your project root:

📄 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["server", "agent", "retriever", "types"]
}
```

📄 `nodemon.json`

```json
{
  "watch": ["server", "agent", "retriever"],
  "ext": "ts,json",
  "exec": "ts-node server/index.ts"
}
```

### 4. Start Ollama Locally

You must run a local model like Mistral or LLaMA3. Open a terminal and run:

```bash
ollama run mistral
```

This will download and start the model, exposing a local API on `http://localhost:11434`.

### 5. Run the Application

#### Start the Backend Server

```bash
# From project root
npm run dev
```

This will launch the Express API at `http://localhost:3000`, which will connect to Ollama.

#### Start the Frontend

```bash
cd ui
npm run dev
```

This will launch the React+TypeScript frontend at `http://localhost:5173` (or another available port). The frontend is proxied to the backend API.

### 6. Using the App

1. Open your browser at `http://localhost:5173`.
2. Enter any health-related claim in the text input (e.g., `Vitamin C cures cancer`).
3. Click **Check Claim**.
4. View the AI’s verdict, explanation, and top evidence sources.
5. Provide feedback using the 👍 **Correct** or 👎 **Incorrect** buttons to help improve the system.

---

## ⚙️ Project Structure

```
ai-health-claim-fact-checker/
├── agent/                  # Core LLM-based claim validation logic
├── retriever/              # Evidence retrieval (PubMed, Wikipedia)
├── scraper/                # Web scraper for real-world claims
├── evaluator/              # Confidence scoring logic
├── guardrails/             # Schema validation of LLM output
├── server/                 # Express API for `/check` and `/feedback`
├── tests/                  # Unit and integration tests
├── types/                  # Shared TypeScript types
├── ui/                     # React + TypeScript frontend
├── package.json            # Backend scripts and dependencies
├── tsconfig.json           # TypeScript compiler configuration
├── nodemon.json            # Nodemon watcher configuration
└── README.md               # Project instructions
```

---

## 🧪 Running Tests

From the project root, run:

```bash
npm test
```

This will execute unit tests for the retriever, agent, guardrails, evaluator, and integration tests on the API endpoints.

---

## 📝 API Endpoints

### `POST /check`

* **Description:** Validates a health claim.
* **Request Body:** `{ "claim": string }`
* **Response:** `{ isFactual: boolean, evidence: string[], explanation: string, [confidence?: number] }`

### `POST /feedback`

* **Description:** Records user feedback on a claim check.
* **Request Body:**

  ```json
  {
    "claim": string,
    "result": { isFactual: boolean, evidence: string[], explanation: string, [confidence?: number] },
    "userFeedback": "correct" | "incorrect",
    "timestamp": string
  }
  ```
* **Response:** `{ message: 'Feedback saved' }`

---

## 📦 Deployment

You can deploy the backend to any Node-compatible hosting (e.g., Heroku, AWS EC2, DigitalOcean) and the frontend to static hosting (e.g., Vercel, Netlify). Note that Ollama must be run on a machine with a compatible GPU/CPU — local hosting is ideal for now.

---

## 💡 Next Steps

* Integrate GuardrailsAI or Rebuff for more advanced LLM output safety.
* Add a database (SQLite or Postgres) to persist claims and feedback.
* Build CI/CD pipelines with GitHub Actions or Azure DevOps.
* Explore fine-tuning or LLM-based self-reflection loops.

---

## 🙏 Contributing

Contributions are welcome! Please open issues and pull requests on GitHub.

---

## 📄 License

MIT © Jeff Corbin
