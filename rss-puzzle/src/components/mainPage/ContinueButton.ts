import { data } from '../../services/dataServices/Data';
import { Button } from '../Buttons/Button';

import { MoveCardEvent } from './MoveCardEvent';
import { ResultField } from './ResultField';
import { ResultSentence } from './ResultSentence';
import { WordCardsField } from './WordCardsField';

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
