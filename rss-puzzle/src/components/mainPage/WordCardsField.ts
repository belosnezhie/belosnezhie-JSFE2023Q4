import { data } from '../../services/dataServices/Data';
import { BasicComponent } from '../BasicComponent';

import { MoveCardEvent } from './MoveCardEvent';

export class WordCardsField extends BasicComponent {
  moveCardEvent: MoveCardEvent;
  sentence: string[];
  constructor(moveCardEvent: MoveCardEvent) {
    super({
      tag: 'div',
      className: 'word_cards_field',
    });

    this.moveCardEvent = moveCardEvent;
    this.sentence = data.setRandomSentenceOrder();

    this.children = this.sentence.map((word: string) => {
      return new BasicComponent({
        tag: 'div',
        className: 'word_card',
        text: word,
      });
    });
  }

  public render(): void {
    super.render();
    this.children?.forEach((child: BasicComponent) => {
      child.component.addEventListener('click', () => {
        child.component.classList.add('disappear');
        setTimeout(() => {
          // child.removeComponent();
          this.moveCardEvent.emit('move', child);
        }, 400);
        // this.moveCardEvent.emit('move', child);
      });
    });
  }
}
