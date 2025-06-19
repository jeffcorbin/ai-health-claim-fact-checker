import axios from 'axios';

/**
 * Searches PubMed via E-utilities for article summaries matching the query.
 */
export async function fetchPubMedSummaries(query: string): Promise<string[]> {
  try {
    // Step 1: Search PubMed
    const searchRes = await axios.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi', {
      params: {
        db: 'pubmed',
        term: query,
        retmode: 'json',
        retmax: 3
      }
    });

    const ids = searchRes.data.esearchresult.idlist;
    if (!ids.length) return [];

    // Step 2: Fetch summaries for those IDs
    const summaryRes = await axios.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi', {
      params: {
        db: 'pubmed',
        id: ids.join(','),
        retmode: 'json'
      }
    });

    const summaries = Object.values(summaryRes.data.result)
      .filter((r: any) => r && r.title)
      .map((r: any) => r.title);

    return summaries;
  } catch (error) {
    console.error('Error fetching from PubMed:', error);
    return [];
  }
}

/**
 * Fetches a Wikipedia summary for a given term.
 */
export async function fetchWikipediaSummary(query: string): Promise<string | null> {
  try {
    const title = encodeURIComponent(query);
    const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    return res.data.extract;
  } catch {
    return null;
  }
}
