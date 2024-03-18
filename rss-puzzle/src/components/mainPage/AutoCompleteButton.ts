import { data } from '../../services/dataServices/Data';
import { Button } from '../Buttons/Button';

import { MoveCardEvent } from './MoveCardEvent';
import { ResultSentence } from './ResultSentence';
import { WordCardsField } from './WordCardsField';

export class AutoCompleteButton extends Button {
  current: string[] = [];
  currentMoveCardEvent: MoveCardEvent;
  resultSentence: ResultSentence;
  wordCardsField: WordCardsField;

  constructor(
    resultSentence: ResultSentence,
    wordCardsField: WordCardsField,
    currentMoveCardEvent: MoveCardEvent,
  ) {
    super('Give up!', 'auto_button', () => {
      if (this.resultSentence.children) {
        while (this.resultSentence.children.length > 0) {
          this.currentMoveCardEvent.emit(
            'moveBack',
            this.resultSentence.children[0],
          );
          this.resultSentence.removeChild(this.resultSentence.children[0]);
        }
      }

      this.current = data.currentSentence;

      this.current.forEach((word) => {
        const correctChild = this.wordCardsField.children?.find(
          (child) => child.component.getAttribute('data_value') === word,
        );

        if (correctChild) {
          this.currentMoveCardEvent.emit('move', correctChild);
          correctChild.component.removeAttribute('class');
          correctChild.component.classList.add('placeholder');
          correctChild.component.removeAttribute('data_value');
          correctChild.component.innerHTML = '';
        }
      });
      this.component.classList.add('disabled');
    });
    this.resultSentence = resultSentence;
    this.currentMoveCardEvent = currentMoveCardEvent;
    this.wordCardsField = wordCardsField;

    this.currentMoveCardEvent.subscribe(
      'resultFieldChanged',
      (resultSentenceField) => {
        if (resultSentenceField instanceof ResultSentence) {
          this.resultSentence = resultSentenceField;
        }
      },
    );
  }
}
