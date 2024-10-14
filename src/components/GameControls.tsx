import React from "react";

type GameControlsProps = {
  isDone: boolean;
  score: number;
  maxScore: number;
  onRestart: () => void;
  onNextLevel: () => void;
};

export const GameControls: React.FC<GameControlsProps> = ({
  isDone,
  score,
  maxScore,
  onRestart,
  onNextLevel,
}) => (
  <div>
    {isDone && score <= maxScore ? (
      <button className="buttonNext" onClick={onNextLevel}>
        Next Level
      </button>
    ) : isDone ? (
      <button className="buttonRestart" onClick={onRestart}>
        Try again?
      </button>
    ) : null}
  </div>
);
