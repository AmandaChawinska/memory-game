import { GameHistoryEntry } from "../types";

const GameHistory = () => {
  const gameHistory: GameHistoryEntry[] = JSON.parse(
    localStorage.getItem("gameHistory") || "[]"
  );

  return (
    <div>
      <h2>Game History</h2>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            Date: {game.date}, Attempts: {game.attempts}, Duration:{" "}
            {Math.floor(game.duration / 60)}:
            {("0" + (game.duration % 60)).slice(-2)} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
