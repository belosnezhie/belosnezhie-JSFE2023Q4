import { BasicComponent } from '../BasicComponent';

import { MoveCardEvent } from './MoveCardEvent';

export class ResultField extends BasicComponent {
  constructor(moveCardEvent: MoveCardEvent) {
    super({
      tag: 'div',
      className: 'result_field',
    });
    moveCardEvent.subscribe('move', (card: BasicComponent) => {
      card.component.classList.remove('disappear');
      card.component.classList.add('appear');
      this.append(card);
    });
  }
}
