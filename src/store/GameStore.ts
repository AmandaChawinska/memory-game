import { makeAutoObservable } from "mobx";
import { GameCard } from "../types";
import { createGameCards, levels } from "../utils/gameHelpers";

class GameStore {
  level = 0;
  gameCards: GameCard[] = [];
  flippedCards: GameCard[] = [];
  score = 0;
  timer = 0;
  isGameActive = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLevel(newLevel: number) {
    this.level = newLevel;
  }

  setGameCards(cards: GameCard[]) {
    this.gameCards = cards;
  }

  flipCard(card: GameCard) {
    if (!this.flippedCards.length) {
      this.flippedCards.push(card);
      return;
    }

    if (this.flippedCards.length !== 1) return;

    this.score++;
    if (this.flippedCards[0].value === card.value) {
      this.setGameCards(
        this.gameCards.map((prevCard) =>
          [card.id, this.flippedCards[0].id].includes(prevCard.id)
            ? { ...prevCard, isMatched: true }
            : prevCard
        )
      );
      this.flippedCards = [];
    } else {
      this.flippedCards.push(card);
      setTimeout(() => {
        this.flippedCards = [];
      }, 1000);
    }
  }

  restartGame() {
    this.setGameCards(createGameCards(levels[this.level].cardCount));
    this.score = 0;
    this.timer = 0;
    this.isGameActive = true;
  }

  nextLevel() {
    const gameData = {
      attempts: this.score,
      duration: this.timer,
      date: new Date().toLocaleString(),
    };

    const gameHistory = JSON.parse(localStorage.getItem("gameHistory") || "[]");
    localStorage.setItem(
      "gameHistory",
      JSON.stringify([...gameHistory, gameData])
    );

    this.setLevel(this.level + 1);
  }

  finishGame() {
    this.isGameActive = false;
  }

  updateTimer() {
    this.timer++;
  }
}

export const gameStore = new GameStore();
