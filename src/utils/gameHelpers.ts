import { GameCard } from "../types";

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createGameCards = (uniqueCards: number): GameCard[] => {
  const gameCards = [] as GameCard[];
  for (let value = 0; value <= uniqueCards; value++) {
    gameCards.push({
      value,
      isMatched: false,
      id: `${value}-1`,
    });
    gameCards.push({
      value,
      isMatched: false,
      id: `${value}-2`,
    });
  }
  return shuffleArray(gameCards);
};

export const levels = [
  { cardCount: 3, maxScore: 8 },
  { cardCount: 4, maxScore: 10 },
  { cardCount: 5, maxScore: 12 },
  { cardCount: 6, maxScore: 14 },
  { cardCount: 7, maxScore: 16 },
];
