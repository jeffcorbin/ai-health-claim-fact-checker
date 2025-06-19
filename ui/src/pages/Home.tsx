import { useState } from 'react';
import axios from 'axios';

interface ClaimCheckResult {
  isFactual: boolean;
  evidence: string[];
  explanation: string;
}

export default function Home() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<ClaimCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const checkClaim = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/check', { claim });
      setResult(res.data as ClaimCheckResult);
    } catch (err) {
      alert('Failed to check claim');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>🧠 Health Claim Checker</h1>
      <input
        type="text"
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder="Enter a health claim..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={checkClaim} disabled={loading || !claim}>
        {loading ? 'Checking...' : 'Check Claim'}
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>✅ Verdict: {result.isFactual ? 'Likely TRUE' : 'Likely FALSE'}</h3>
          <p><strong>Explanation:</strong> {result.explanation}</p>
          <p><strong>Evidence:</strong></p>
          <ul>
            {result.evidence.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}