import React from "react";

type ScoreBoardProps = {
  level: number;
  score: number;
  maxScore: number;
  isDone: boolean;
};

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  level,
  score,
  maxScore,
  isDone,
}) => (
  <div>
    <p>Level: {level + 1}</p>
    <p>Score: {score}</p>
    {!isDone ? (
      <div>Remaining Moves: {maxScore - score}</div>
    ) : score <= maxScore ? (
      <p>Nice work!</p>
    ) : (
      <p>You were over by {score - maxScore}</p>
    )}
  </div>
);
