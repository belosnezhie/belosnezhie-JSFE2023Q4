import firstLevel from '../../data/wordCollectionLevel1.json';
// import secondLevel from '../../data/wordCollectionLevel2.json';
// import thirdLevel from '../../data/wordCollectionLevel3.json';
// import forthLevel from '../../data/wordCollectionLevel4.json';
// import fifthLevel from '../../data/wordCollectionLevel5.json';

import { AllRounds, Round, SentenceData } from './DataInterfaces';

class Data {
  public currentBackground: number[];
  // Текущее предложение в случайном порядке
  public currentRandomSentence: string[];
  // Индекс текущей картинки
  public currentRoundIndex: number = 0;
  // Текущее предложение
  public currentSentence: string[] = [];
  // Ширина
  public currentWidth: number[];
  // Индекс текущего предложения
  public sentenceIndex: number = 0;
  // Инддекс количество уровней в картинке
  public sentenceLevelsCount: number = 0;
  // Все раунды этого уровня (сколько всего картинок)
  private allRounds: AllRounds = firstLevel as AllRounds;
  // Текущая картинка
  private currentRound: Round = this.allRounds.rounds[this.currentRoundIndex];

  constructor() {
    this.currentSentence = this.getCurrentSentence();
    this.currentRandomSentence = this.setRandomSentenceOrder();
    this.currentWidth = this.setWidth();
    this.currentBackground = this.setBackground();
    this.sentenceLevelsCount = this.getCurrentRoundsCount();
  }

  public checkCurrentRound(): boolean {
    if (this.sentenceIndex >= this.sentenceLevelsCount - 1) {
      this.setCurrentRound();
      this.sentenceIndex = 0;
      this.currentSentence = this.getCurrentSentence();
      this.currentRandomSentence = this.setRandomSentenceOrder();
      this.currentWidth = this.setWidth();
      this.currentBackground = this.setBackground();

      return true;
    }

    return false;
  }

  public getCurrentRounds() {
    return this.currentRound.words;
  }

  public getCurrentRoundsCount(): number {
    return this.currentRound.words.length;
  }

  public setCurrentRound() {
    this.currentRoundIndex += 1;
    this.currentRound = this.allRounds.rounds[this.currentRoundIndex];
  }

  public setRandomSentenceOrder(): string[] {
    const randomCurrentSentence: string[] = [];
    const temp: string[] = this.currentSentence.map((item) => item);

    for (let i = 0; i < this.currentSentence.length; i++) {
      const candidateIndex: number = this.getRandomInt(temp.length);

      randomCurrentSentence.push(temp[candidateIndex]);
      temp.splice(candidateIndex, 1);
    }

    return randomCurrentSentence;
  }

  public setSentenceIndex() {
    this.sentenceIndex += 1;
    this.currentSentence = this.getCurrentSentence();
    this.currentRandomSentence = this.setRandomSentenceOrder();
    this.currentWidth = this.setWidth();
    this.currentBackground = this.setBackground();
  }

  private getCurrentSentence(): string[] {
    const currentSentence: SentenceData =
      this.currentRound.words[this.sentenceIndex];

    return currentSentence.textExample.split(' ');
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private setBackground(): number[] {
    const tempCurrentBg: number[] = [];
    const sentenceLength: number = this.currentSentence.join('').length;

    this.currentSentence.forEach((word) => {
      tempCurrentBg.push(word.length);
    });

    const currentBg = tempCurrentBg.map((wordWidth) => {
      // return Number(((wordWidth * 100) / sentenceLength).toFixed(2));
      return Math.floor((wordWidth * 100) / sentenceLength);
    });

    return currentBg;
  }

  private setWidth(): number[] {
    const tempCurrentWidth: number[] = [];
    const sentenceLength: number = this.currentSentence.join('').length;

    this.currentRandomSentence.forEach((word) => {
      tempCurrentWidth.push(word.length);
    });

    const currentWidth = tempCurrentWidth.map((wordWidth) => {
      return Number(((wordWidth * 100) / sentenceLength).toFixed(2));
    });

    return currentWidth;
  }
}

export const data = new Data();
