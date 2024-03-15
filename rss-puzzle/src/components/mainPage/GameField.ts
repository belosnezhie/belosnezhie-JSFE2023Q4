import { checkSentence } from '../../logic/SentenceCheck';
import { data } from '../../services/dataServices/Data';
import { BasicComponent } from '../BasicComponent';
import { Button } from '../Buttons/Button';

import { currentMoveCardEvent } from './MoveCardEvent';
import { ResultField } from './ResultField';
import { ResultSentence } from './ResultSentence';
import { wordCardsField } from './WordCardsField';

let resultSentence = new ResultSentence(currentMoveCardEvent);
const resultField = new ResultField(resultSentence);

export class GameField extends BasicComponent {
  continueButton: Button;

  constructor() {
    const continueButton = new Button('Continue', 'continue_button', () => {
      const swichedToNextRound = data.checkCurrentRound();

      if (swichedToNextRound) {
        resultField.changeRound();
      } else {
        data.setSentenceIndex();
      }

      const newSentense = new ResultSentence(currentMoveCardEvent);

      newSentense.render();

      resultField.append(newSentense);

      wordCardsField.updateCards();
      this.replaceChild(wordCardsField, wordCardsField);
      resultField.children?.forEach((child, index, array) => {
        if (index !== array.length - 1) {
          child.component.classList.add('disabled');
        }
      });
      resultSentence = newSentense;
    });

    continueButton.addClass('disabled');

    super(
      {
        tag: 'div',
        className: 'game_field',
      },
      resultField,
      wordCardsField,
      continueButton,
    );
    this.continueButton = continueButton;
    currentMoveCardEvent.subscribe('resultSentenseChanged', () => {
      const user = resultSentence.getUserSentence();
      const current = data.currentSentence;

      if (checkSentence(current, user)) {
        continueButton.removeClass('disabled');
      }
    });
  }

  public render(): void {
    super.render();
  }
}
