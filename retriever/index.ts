import { fetchPubMedSummaries, fetchWikipediaSummary } from './retriever';

export async function getEvidence(query: string): Promise<string[]> {
  const pubmed = await fetchPubMedSummaries(query);
  const wiki = await fetchWikipediaSummary(query);
  return [...pubmed, ...(wiki ? [wiki] : [])];
}