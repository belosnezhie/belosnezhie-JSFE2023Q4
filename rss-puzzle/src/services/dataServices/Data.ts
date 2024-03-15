import firstLevel from '../../data/wordCollectionLevel1.json';
// import secondLevel from '../../data/wordCollectionLevel2.json';
// import thirdLevel from '../../data/wordCollectionLevel3.json';
// import forthLevel from '../../data/wordCollectionLevel4.json';
// import fifthLevel from '../../data/wordCollectionLevel5.json';

import { AllRounds, Round, SentenceData } from './DataInterfaces';

class Data {
  // Индекс текущей картинки
  public currentRoundIndex: number = 0;
  // Текущее предложение
  public currentSentence: string[] = [];
  // Индекс текущего предложения
  public sentenceIndex: number = 2;
  // Инддекс количество уровней в картинке
  public sentenceLevelsCount: number = 0;
  // Все раунды этого уровня (сколько всего картинок)
  private allRounds: AllRounds = firstLevel as AllRounds;
  // Текущая картинка
  private currentRound: Round = this.allRounds.rounds[this.currentRoundIndex];

  constructor() {
    this.currentSentence = this.getCurrentSentence();
    this.sentenceLevelsCount = this.getCurrentRoundsCount();
  }

  public checkCurrentRound(): boolean {
    if (this.sentenceIndex >= this.sentenceLevelsCount - 1) {
      this.setCurrentRound();
      this.sentenceIndex = 0;
      this.currentSentence = this.getCurrentSentence();

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

  public setRandomSentenceOrder() {
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
  }

  private getCurrentSentence(): string[] {
    const currentSentence: SentenceData =
      this.currentRound.words[this.sentenceIndex];

    return currentSentence.textExample.split(' ');
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}

export const data = new Data();
