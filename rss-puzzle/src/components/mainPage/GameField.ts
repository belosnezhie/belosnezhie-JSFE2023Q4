import { checkSentence } from '../../logic/SentenceCheck';
import { data } from '../../services/dataServices/Data';
import { BasicComponent } from '../BasicComponent';

import { CheckButton } from './CheckButton';
import { ContinueButton } from './ContinueButton';
import { currentMoveCardEvent } from './MoveCardEvent';
import { ResultField } from './ResultField';
import { ResultSentence } from './ResultSentence';
import { wordCardsField } from './WordCardsField';

let resultSentence = new ResultSentence(currentMoveCardEvent);
const resultField = new ResultField(resultSentence);

export class GameField extends BasicComponent {
  private checkButton: CheckButton;
  private continueButton: ContinueButton;

  constructor() {
    const continueButton: ContinueButton = new ContinueButton(
      resultField,
      resultSentence,
      wordCardsField,
      currentMoveCardEvent,
    );

    const checkButton: CheckButton = new CheckButton(
      resultSentence,
      currentMoveCardEvent,
    );

    super(
      {
        tag: 'div',
        className: 'game_field',
      },
      resultField,
      wordCardsField,
      checkButton,
    );
    this.continueButton = continueButton;
    this.checkButton = checkButton;
    this.checkButton.addClass('disabled');

    currentMoveCardEvent.subscribe('resultSentenseChanged', () => {
      const user: string[] = resultSentence.getUserSentence();
      const current: string[] = data.currentSentence;

      if (user.length === current.length) {
        checkButton.removeClass('disabled');
        checkButton.setCurrentSentence(current);
        checkButton.setUserSentence(user);
      }

      if (checkSentence(current, user)) {
        setTimeout(() => {
          this.append(continueButton);
          this.removeChildComponent(checkButton);
        }, 500);
      }
    });

    currentMoveCardEvent.subscribe('reRender', (newSentense) => {
      this.replaceChild(wordCardsField, wordCardsField);
      this.removeChildComponent(continueButton);
      resultField.children?.forEach((child, index, array) => {
        if (index !== array.length - 1) {
          child.component.classList.add('disabled');
        }
      });
      if (newSentense instanceof ResultSentence) {
        resultSentence = newSentense;
        currentMoveCardEvent.emit('resultFieldChanged', resultSentence);
      }
    });
  }

  public render(): void {
    super.render();
  }
}
