export interface Question {
  question: string;
  answer: string;
  value: number;
  attachment?: string; // URL of the attachment
  attachment_type?: string; // Type: "image", "video", etc.
}

export interface Category {
  name: string;
  questions: Question[];
}

export interface Round {
  name: string;
  categories?: Category[]; // For rounds 1 and 2
  category?: string; // For final round
  question?: string; // For final round
  answer?: string; // For final round
}

export interface GameData {
  id: string;
  name: string;
  created_at: string;
  rounds: Round[];
}

export interface FinalRoundWager {
  playerId: string;
  wager: number;
}
