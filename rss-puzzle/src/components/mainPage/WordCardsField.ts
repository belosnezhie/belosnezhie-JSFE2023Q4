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
      const wordWidth: number = child.component.innerHTML.length;
      const cardWidth: number = (wordWidth / 10) * 100;

      child.component.setAttribute('style', `width:${cardWidth}%`);

      child.component.addEventListener('click', () => {
        child.component.classList.add('disappear');
        setTimeout(() => {
          this.moveCardEvent.emit('move', child);
        }, 400);
      });
    });
  }
}
