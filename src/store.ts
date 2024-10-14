import { makeAutoObservable } from "mobx";
import { GameCard } from "./types";

class GameStore {
  gameCards: GameCard[] = [];
  attempts: number = 0;
  matchedPairs: number = 0;
  level: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  resetGame() {
    this.gameCards = this.createGameCards();
    this.attempts = 0;
    this.matchedPairs = 0;
  }

  createGameCards(): GameCard[] {
    const numberOfCards = (this.level + 3) * 2;
    const gameCards: GameCard[] = [];
    for (let i = 0; i < numberOfCards / 2; i++) {
      const card1: GameCard = { value: i, id: `card-${i}-1`, isMatched: false };
      const card2: GameCard = { value: i, id: `card-${i}-2`, isMatched: false };
      gameCards.push(card1, card2);
    }
    return this.shuffleArray(gameCards);
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export const gameStore = new GameStore();
