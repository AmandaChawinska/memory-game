import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { GameCard } from "./types";
import { Card } from "./components/Card";
import { ScoreBoard } from "./components/ScoreBoard";
import { GameControls } from "./components/GameControls";
import { createGameCards, levels } from "./utils/gameHelpers";
import GameHistory from "./components/GameHistory";
import { gameStore } from "./store/GameStore";

const App = observer(() => {
  useEffect(() => {
    const levelConfig = levels[gameStore.level];
    if (!levelConfig) {
      gameStore.finishGame();
    } else {
      gameStore.setGameCards(createGameCards(levelConfig.cardCount));
      gameStore.score = 0;
      gameStore.timer = 0;
      gameStore.isGameActive = true;
    }
  }, [gameStore.level]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (gameStore.isGameActive) {
      interval = setInterval(() => {
        gameStore.updateTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStore.isGameActive]);

  const handleCardFlip = (gameCard: GameCard) => {
    gameStore.flipCard(gameCard);
  };

  const handleRestart = () => {
    gameStore.restartGame();
  };

  const handleNextLevel = () => {
    gameStore.nextLevel();
  };

  if (!levels[gameStore.level]) {
    gameStore.finishGame();
    return <h1>You win!</h1>;
  }

  const hours = Math.floor(gameStore.timer / 3600);
  const minutes = Math.floor((gameStore.timer % 3600) / 60);
  const seconds = gameStore.timer % 60;

  return (
    <div className="mainApp">
      <h1 className="title">Memory Game</h1>
      <div className="timer">
        Time: {hours} h {minutes} minutes {seconds} seconds
      </div>
      <div className="cards">
        {gameStore.gameCards.map((gameCard) => (
          <Card
            key={gameCard.id}
            card={gameCard}
            isFlipped={gameStore.flippedCards.some(
              (flippedCard) => flippedCard.id === gameCard.id
            )}
            isDisabled={gameStore.flippedCards.length === 2}
            onFlip={handleCardFlip}
          />
        ))}
      </div>
      <ScoreBoard
        level={gameStore.level}
        score={gameStore.score}
        maxScore={levels[gameStore.level].maxScore}
        isDone={gameStore.gameCards.every((gameCard) => gameCard.isMatched)}
      />
      <GameControls
        isDone={gameStore.gameCards.every((gameCard) => gameCard.isMatched)}
        score={gameStore.score}
        maxScore={levels[gameStore.level].maxScore}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
      />
      <GameHistory />
    </div>
  );
});

export default App;
