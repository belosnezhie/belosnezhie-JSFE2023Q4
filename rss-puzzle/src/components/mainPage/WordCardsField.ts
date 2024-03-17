import { data } from '../../services/dataServices/Data';
import { BasicComponent } from '../BasicComponent';

import { MoveCardEvent, currentMoveCardEvent } from './MoveCardEvent';

export class WordCardsField extends BasicComponent {
  moveCardEvent: MoveCardEvent;
  constructor(moveCardEvent: MoveCardEvent) {
    super({
      tag: 'div',
      className: 'word_cards_field',
    });

    this.moveCardEvent = moveCardEvent;

    this.updateWord();

    moveCardEvent.unsubscribeAll('moveBack');
    moveCardEvent.subscribe('moveBack', (resultCard: BasicComponent) => {
      resultCard.component.classList.remove('appear');
      resultCard.component.classList.add('disappear');
      const text: string | null =
        resultCard.component.getAttribute('data_value');
      const cardWidth: string | null =
        resultCard.component.getAttribute('style');

      setTimeout(() => {
        resultCard.removeComponent();
      }, 400);
      if (this.children) {
        const firstPlaceholder = this.children.find((child) =>
          child.component.classList.contains('placeholder'),
        );

        if (firstPlaceholder && text) {
          firstPlaceholder.removeClass('placeholder');
          firstPlaceholder.component.classList.add('word_card');
          firstPlaceholder.component.textContent = text;
          firstPlaceholder.component.setAttribute('data_value', text);
          if (cardWidth) {
            firstPlaceholder.component.setAttribute('style', cardWidth);
          }
        }
      }
      this.moveCardEvent.emit('resultSentenceChanged', resultCard);
    });
  }

  public render(): void {
    super.render();
    this.children?.forEach((child: BasicComponent) => {
      // const wordWidth: number = child.component.innerHTML.length;
      // const cardWidth: number = (wordWidth / 10) * 100;

      // child.component.setAttribute('style', `width:${cardWidth}%`);

      this.countWidth(child);

      child.component.addEventListener('click', () => {
        child.component.classList.add('disappear');
        setTimeout(() => {
          this.moveCardEvent.emit('move', child);
          child.component.classList.remove('word_card');
          child.component.classList.add('placeholder');
          child.component.removeAttribute('data_value');
          child.component.removeAttribute('slyle');
          child.component.innerHTML = '';
        }, 400);
      });
    });
  }

  public updateCards() {
    this.removeChildren();
    this.clearChildrenArr();
    this.updateWord();
    this.removeComponent();
    this.render();
  }

  public updateWord() {
    const sentence: string[] = data.setRandomSentenceOrder();

    this.children = sentence.map((word: string) => {
      const card = new BasicComponent({
        tag: 'div',
        className: 'word_card',
        text: word,
      });

      card.addAttribute('data_value', word);

      return card;
    });
  }

  private countWidth(child: BasicComponent) {
    const sentenceLength: number = data.currentSentence.join('').length;

    const wordWidth: number = child.component.innerHTML.length;
    const cardWidth: number = Math.floor((wordWidth * 100) / sentenceLength);

    child.component.setAttribute('style', `width:${cardWidth}%`);
    child.component.setAttribute('data_width', `width:${cardWidth}%`);
  }

  private setDataWidth(child: BasicComponent) {
    const cardWidthPx: number = child.component.clientWidth;

    child.component.setAttribute('data_width', `width:${cardWidthPx}px`);
  }
}

export const wordCardsField = new WordCardsField(currentMoveCardEvent);
