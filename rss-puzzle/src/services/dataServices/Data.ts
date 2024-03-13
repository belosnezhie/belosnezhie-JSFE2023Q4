import jsonData from '../../data/wordCollectionLevel1.json';

import { AllRounds, Round, SentenceData } from './DataInterfaces';

class Data {
  public currentSentence: string[] = [];

  constructor() {
    this.currentSentence = this.getCurrentSentence();
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

  private getCurrentSentence(): string[] {
    const allRounds: AllRounds = jsonData as AllRounds;
    const firstRound: Round = allRounds.rounds[0];
    const firstWord: SentenceData = firstRound.words[0];

    return firstWord.textExample.split(' ');
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}

export const data = new Data();
