import { WordPair } from '@/types/game';
import { getRandomWordPair } from '@/data/fallbackWords';

export async function generateWordPair(
  difficulty: 'easy' | 'medium' | 'hard',
  apiKey?: string
): Promise<WordPair> {
  console.log('=== generateWordPair called ===');
  console.log('Difficulty:', difficulty);
  console.log('API Key provided:', apiKey ? 'YES (length: ' + apiKey.length + ')' : 'NO');
  console.log('ENV variable:', process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 'EXISTS' : 'NOT SET');

  // Check if API key exists (either passed or in env)
  const hasApiKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!hasApiKey) {
    console.log('No API key available, using fallback words immediately');
    return getRandomWordPair(difficulty);
  }

  console.log('API key available, calling Gemini API...');

  try {
    const response = await fetch('/api/generate-words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty, apiKey }),
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      console.error('API response not OK:', response.statusText);
      throw new Error('Failed to generate words');
    }

    const data = await response.json();
    console.log('API response data:', data);
    console.log('Word source:', data.source || 'unknown');
    
    return data.wordPair;
  } catch (error) {
    console.error('=== Error generating words with AI ===');
    console.error('Error:', error);
    console.log('Falling back to local words');
    return getRandomWordPair(difficulty);
  }
}

