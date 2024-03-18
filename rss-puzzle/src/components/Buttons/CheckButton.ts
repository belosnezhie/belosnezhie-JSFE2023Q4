import { MoveCardEvent } from '../mainPage/MoveCardEvent';
import { ResultSentence } from '../mainPage/ResultSentence';

import { Button } from './Button';

export class CheckButton extends Button {
  current: string[] = [];
  currentMoveCardEvent: MoveCardEvent;
  resultSentence: ResultSentence;
  user: string[] = [];

  constructor(
    resultSentence: ResultSentence,
    currentMoveCardEvent: MoveCardEvent,
  ) {
    super('Check sentence', 'check_button');
    this.resultSentence = resultSentence;
    this.currentMoveCardEvent = currentMoveCardEvent;

    this.currentMoveCardEvent.subscribe(
      'resultFieldChanged',
      (resultSentenceField) => {
        if (resultSentenceField instanceof ResultSentence) {
          this.resultSentence = resultSentenceField;
        }
      },
    );
  }

  public checkWordsOrder(user: string[], current: string[]) {
    const mistakes = current.map((word: string, index: number) => {
      if (word !== user[index]) {
        return user[index];
      }
    });

    this.resultSentence.children?.forEach((child) => {
      const value: string | null = child.component.getAttribute('data_value');

      if (value && mistakes.includes(value)) {
        child.component.classList.add('mistake');
      }
    });
    this.component.classList.add('disabled');
  }

  public render(): void {
    super.render();
    this.component.addEventListener('click', () => {
      this.checkWordsOrder(this.user, this.current);
    });
  }

  public setCurrentSentence(current: string[]) {
    this.current = current;
  }

  public setUserSentence(user: string[]) {
    this.user = user;
  }
}
