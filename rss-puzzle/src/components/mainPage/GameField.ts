import { BasicComponent } from '../BasicComponent';

import { MoveCardEvent } from './MoveCardEvent';
import { ResultField } from './ResultField';
import { WordCardsField } from './WordCardsField';

const moveCardEvent = new MoveCardEvent();
const resultField = new ResultField(moveCardEvent);
const wordCardsField = new WordCardsField(moveCardEvent);
// const wordCardsField = new BasicComponent({ className: 'word_cards_field' });

export class GameField extends BasicComponent {
  constructor() {
    super(
      {
        tag: 'div',
        className: 'game_field',
      },
      resultField,
      wordCardsField,
    );
  }

  public render(): void {
    super.render();
  }
}
