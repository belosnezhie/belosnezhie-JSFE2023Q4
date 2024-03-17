import { BasicComponent } from '../BasicComponent';

import { MoveCardEvent } from './MoveCardEvent';

export class ResultSentence extends BasicComponent {
  moveCardEvent: MoveCardEvent;

  constructor(moveCardEvent: MoveCardEvent) {
    super({
      tag: 'div',
      className: 'result_sentense',
    });

    this.moveCardEvent = moveCardEvent;
    const moveCardInResult = (card: BasicComponent) => {
      this.createWordCards(card);
      moveCardEvent.emit('resultSentenceChanged', card);
    };

    moveCardEvent.unsubscribe('move', moveCardInResult);
    moveCardEvent.subscribe('move', moveCardInResult);
  }

  public getUserSentence() {
    const userSentence: string[] = [];

    this.children?.forEach((child) => {
      userSentence.push(child.component.textContent || '');
    });

    return userSentence;
  }

  private createWordCards(card: BasicComponent) {
    card.component.classList.remove('disappear');
    const copyCard = new BasicComponent({
      tag: card.tag,
      className: card.classNames[0],
    });

    const value: string | null = card.component.getAttribute('data_value');

    if (value) {
      copyCard.addAttribute('data_value', value);
      copyCard.addText(value);
    }

    const cardWidth: string | null = card.component.getAttribute('style');

    copyCard.addClass('appear');

    copyCard.render();
    this.append(copyCard);
    if (cardWidth) {
      copyCard.component.setAttribute('style', cardWidth);
    }

    copyCard.component.addEventListener('click', () => {
      this.removeChild(copyCard);
      this.moveCardEvent.emit('moveBack', copyCard);
    });
  }
}
