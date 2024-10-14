import React, { useCallback } from "react";
import { GameCard } from "../types";
import "../styles/Card.scss";

type CardProps = {
  card: GameCard;
  isFlipped: boolean;
  isDisabled: boolean;
  onFlip: (gameCard: GameCard) => void;
};

export const Card: React.FC<CardProps> = ({
  card,
  isFlipped,
  isDisabled,
  onFlip,
}) => {
  const handleClick = useCallback(() => {
    onFlip(card);
  }, [onFlip, card]);

  const isCardFlipped = card.isMatched || isFlipped;

  return (
    <button
      className={`card-front ${isCardFlipped ? "card-front--flipped" : ""}`}
      disabled={isCardFlipped || isDisabled}
      onClick={handleClick}
    >
      <div className="hidden">?</div>
      <div className="hidden hiddenRotate ">{card.value}</div>
    </button>
  );
};
