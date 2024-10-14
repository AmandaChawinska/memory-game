export type GameCard = {
  value: number;
  id: string;
  isMatched: boolean;
};

export interface GameHistoryEntry {
  date: string;
  attempts: number;
  duration: number;
}
