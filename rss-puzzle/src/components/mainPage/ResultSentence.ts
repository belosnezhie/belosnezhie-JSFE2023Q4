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

    const styles: string | null = card.component.getAttribute('style');

    const position: string | null =
      card.component.getAttribute('data_position');

    card.classNames.forEach((className) => copyCard.addClass(className));

    copyCard.addClass('appear');

    copyCard.render();
    this.append(copyCard);
    if (styles) {
      copyCard.component.setAttribute('style', styles);
      copyCard.addAttribute('style', styles);
    }
    if (position) {
      copyCard.component.setAttribute('data_position', position);
      copyCard.addAttribute('data_position', position);
    }

    copyCard.component.addEventListener('click', () => {
      this.removeChild(copyCard);
      this.moveCardEvent.emit('moveBack', copyCard);
    });
  }
}
