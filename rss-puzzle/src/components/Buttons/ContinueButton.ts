import { data } from '../../services/dataServices/Data';
import { MoveCardEvent } from '../mainPage/MoveCardEvent';
import { ResultField } from '../mainPage/ResultField';
import { ResultSentence } from '../mainPage/ResultSentence';
import { WordCardsField } from '../mainPage/WordCardsField';

import { Button } from './Button';

export class ContinueButton extends Button {
  constructor(
    resultField: ResultField,
    resultSentence: ResultSentence,
    wordCardsField: WordCardsField,
    currentMoveCardEvent: MoveCardEvent,
  ) {
    super('Continue', 'continue_button', () => {
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
      currentMoveCardEvent.emit('reRender', newSentense);
    });
  }
}
