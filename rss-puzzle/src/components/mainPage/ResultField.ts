import { BasicComponent } from '../BasicComponent';

import { MoveCardEvent } from './MoveCardEvent';

export class ResultField extends BasicComponent {
  moveCardEvent: MoveCardEvent;

  constructor(moveCardEvent: MoveCardEvent) {
    super({
      tag: 'div',
      className: 'result_field',
    });
    this.moveCardEvent = moveCardEvent;
    moveCardEvent.subscribe('move', (card: BasicComponent) => {
      this.createWordCards(card);
    });
  }

  public render(): void {
    super.render();
    this.children?.forEach((child: BasicComponent) => {
      child.component.addEventListener('click', () => {
        child.component.classList.add('disappear');
        setTimeout(() => {
          this.moveCardEvent.emit('remove', child);
        }, 400);
      });
    });
  }

  private createWordCards(card: BasicComponent) {
    card.component.classList.remove('disappear');
    const copyCard = new BasicComponent({
      tag: card.tag,
      className: card.classNames[0],
      text: card.text,
    });

    const cardWidth: number = card.component.clientWidth;

    copyCard.addClass('appear');

    copyCard.render();
    this.append(copyCard);
    copyCard.component.setAttribute('style', `width:${cardWidth}px`);

    copyCard.component.addEventListener('click', () => {
      this.moveCardEvent.emit('moveBack', copyCard);
    });
  }
}
