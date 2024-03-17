import { checkSentence } from '../../logic/SentenceCheck';
import { data } from '../../services/dataServices/Data';
import { BasicComponent } from '../BasicComponent';

import { AutoCompleteButton } from './AutoCompleteButton';
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

    const autoCompleteButton: AutoCompleteButton = new AutoCompleteButton(
      resultSentence,
      wordCardsField,
      currentMoveCardEvent,
    );

    const buttonsContainer = new BasicComponent({
      tag: 'div',
      className: 'buttons_container',
    });

    super(
      {
        tag: 'div',
        className: 'game_field',
      },
      resultField,
      wordCardsField,
      buttonsContainer,
      // autoCompleteButton,
      // checkButton,
    );
    this.checkButton = checkButton;
    this.checkButton.addClass('disabled');

    buttonsContainer.append(autoCompleteButton);
    buttonsContainer.append(checkButton);

    currentMoveCardEvent.subscribe('resultSentenceChanged', () => {
      const user: string[] = resultSentence.getUserSentence();
      const current: string[] = data.currentSentence;

      if (user.length === current.length) {
        checkButton.removeClass('disabled');
        checkButton.setCurrentSentence(current);
        checkButton.setUserSentence(user);
      }

      if (checkSentence(current, user)) {
        setTimeout(() => {
          buttonsContainer.append(continueButton);
          buttonsContainer.removeChildComponent(checkButton);
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
