export interface AllRounds {
  rounds: Round[];
  roundsCount: number;
}

export interface Round {
  levelData: LevelData;
  words: SentenceData[];
}

export interface LevelData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}

export interface SentenceData {
  audioExample: string;
  id: number;
  textExample: string;
  textExampleTranslate: string;
  word: string;
  wordTranslate: string;
}
