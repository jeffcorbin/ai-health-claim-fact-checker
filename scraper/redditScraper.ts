import axios from 'axios';

/**
 * Scrapes Reddit posts from r/nutrition or r/health for health claims.
 * Uses the Pushshift API.
 */
export async function scrapeClaimsFromReddit(limit = 10): Promise<string[]> {
  try {
    const res = await axios.get('https://api.pushshift.io/reddit/search/submission', {
      params: {
        subreddit: 'nutrition',
        size: limit,
        sort: 'desc',
        sort_type: 'created_utc',
        fields: ['title']
      }
    });

    const claims = res.data.data.map((post: any) => post.title).filter(Boolean);
    return claims;
  } catch (error) {
    console.error('Error scraping Reddit:', error);
    return [];
  }
}
