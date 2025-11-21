import { WordPair } from '@/types/game';

export const fallbackWords: WordPair[] = [
  // Easy Level - English words (concepts from English or Hindi culture)
  {
    civilian_word: 'Book',
    undercover_word: 'Novel',
    relationship: 'Both are reading materials, but one is general and one is specific',
  },
  {
    civilian_word: 'Tea',
    undercover_word: 'Coffee',
    relationship: 'Both are hot beverages',
  },
  {
    civilian_word: 'Dog',
    undercover_word: 'Cat',
    relationship: 'Both are common pets',
  },
  {
    civilian_word: 'Sun',
    undercover_word: 'Moon',
    relationship: 'Both are celestial bodies',
  },
  {
    civilian_word: 'Hot',
    undercover_word: 'Cold',
    relationship: 'Temperature opposites',
  },
  {
    civilian_word: 'Water',
    undercover_word: 'Juice',
    relationship: 'Both are liquids to drink',
  },
  {
    civilian_word: 'Bread',
    undercover_word: 'Toast',
    relationship: 'Both are baked goods',
  },
  {
    civilian_word: 'Flower',
    undercover_word: 'Rose',
    relationship: 'General vs specific flower',
  },
  {
    civilian_word: 'Tree',
    undercover_word: 'Forest',
    relationship: 'Single tree vs collection of trees',
  },
  {
    civilian_word: 'Rain',
    undercover_word: 'Storm',
    relationship: 'Both are weather phenomena',
  },

  // Medium Level - English words (concepts from English or Hindi culture)
  {
    civilian_word: 'Doctor',
    undercover_word: 'Nurse',
    relationship: 'Both are medical professionals',
  },
  {
    civilian_word: 'Train',
    undercover_word: 'Metro',
    relationship: 'Both are rail transport systems',
  },
  {
    civilian_word: 'Television',
    undercover_word: 'Cinema',
    relationship: 'Both are visual entertainment mediums',
  },
  {
    civilian_word: 'Castle',
    undercover_word: 'Palace',
    relationship: 'Both are royal structures',
  },
  {
    civilian_word: 'River',
    undercover_word: 'Ocean',
    relationship: 'Both are water bodies',
  },
  {
    civilian_word: 'Airplane',
    undercover_word: 'Helicopter',
    relationship: 'Both are aircraft',
  },
  {
    civilian_word: 'Music',
    undercover_word: 'Song',
    relationship: 'General vs specific musical expression',
  },
  {
    civilian_word: 'Game',
    undercover_word: 'Match',
    relationship: 'General sport vs specific game event',
  },
  {
    civilian_word: 'Medicine',
    undercover_word: 'Pill',
    relationship: 'Both are medical treatments',
  },
  {
    civilian_word: 'Wedding',
    undercover_word: 'Marriage',
    relationship: 'Both are relationship celebrations',
  },

  // Hard Level - English words (concepts from English or Hindi culture)
  {
    civilian_word: 'Justice',
    undercover_word: 'Fairness',
    relationship: 'Similar legal and moral concepts',
  },
  {
    civilian_word: 'Freedom',
    undercover_word: 'Liberty',
    relationship: 'Similar concepts of independence',
  },
  {
    civilian_word: 'Courage',
    undercover_word: 'Bravery',
    relationship: 'Same meaning - being brave',
  },
  {
    civilian_word: 'Knowledge',
    undercover_word: 'Wisdom',
    relationship: 'Information vs applied knowledge',
  },
  {
    civilian_word: 'Love',
    undercover_word: 'Romance',
    relationship: 'General love vs romantic love',
  },
  {
    civilian_word: 'Art',
    undercover_word: 'Painting',
    relationship: 'General art vs specific art form',
  },
  {
    civilian_word: 'Science',
    undercover_word: 'Physics',
    relationship: 'General science vs specific science',
  },
  {
    civilian_word: 'History',
    undercover_word: 'Heritage',
    relationship: 'Past events vs cultural legacy',
  },
  {
    civilian_word: 'Education',
    undercover_word: 'School',
    relationship: 'Process vs institution',
  },
  {
    civilian_word: 'Religion',
    undercover_word: 'Faith',
    relationship: 'Organized belief vs personal belief',
  },
];

export const getRandomWordPair = (difficulty?: 'easy' | 'medium' | 'hard'): WordPair => {
  let filteredWords = fallbackWords;
  
  if (difficulty === 'easy') {
    filteredWords = fallbackWords.slice(0, 10);
  } else if (difficulty === 'medium') {
    filteredWords = fallbackWords.slice(10, 20);
  } else if (difficulty === 'hard') {
    filteredWords = fallbackWords.slice(20, 30);
  }

  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
};

