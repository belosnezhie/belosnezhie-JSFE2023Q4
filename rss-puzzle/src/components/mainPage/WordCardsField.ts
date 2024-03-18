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
      const style: string | null = resultCard.component.getAttribute('style');
      const position: string | null =
        resultCard.component.getAttribute('data_position');

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
          if (style) {
            firstPlaceholder.component.setAttribute('style', style);
          }
          if (position) {
            firstPlaceholder.component.classList.add(position);
            firstPlaceholder.component.setAttribute('data_position', position);
          }
        }
      }
      this.moveCardEvent.emit('resultSentenceChanged', resultCard);
    });
  }

  public render(): void {
    super.render();
    this.children?.forEach((child: BasicComponent, index: number) => {
      this.setStyles(child, index);
      this.setCardsOrder(child);

      child.component.addEventListener('click', () => {
        child.component.classList.add('disappear');
        setTimeout(() => {
          this.moveCardEvent.emit('move', child);
          // child.component.classList.remove('word_card');
          child.component.removeAttribute('class');
          child.component.classList.add('placeholder');
          child.component.removeAttribute('data_value');
          child.component.removeAttribute('data_position');
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
    const sentence: string[] = data.currentRandomSentence;

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

  private setCardsOrder(child: BasicComponent) {
    const firstWord: string = data.currentSentence[0];
    const lastWord: string =
      data.currentSentence[data.currentSentence.length - 1];

    const word = child.component.innerHTML;

    if (word === firstWord) {
      child.component.classList.add('first');
      child.addClass('first');
      child.component.setAttribute('data_position', 'first');
      child.addAttribute('data_position', 'first');
    } else if (word === lastWord) {
      child.component.classList.add('last');
      child.addClass('last');
      child.component.setAttribute('data_position', 'last');
      child.addAttribute('data_position', 'last');
    } else {
      child.component.classList.add('middle');
      child.addClass('middle');
      child.component.setAttribute('data_position', 'middle');
      child.addAttribute('data_position', 'middle');
    }
  }

  private setStyles(child: BasicComponent, index: number) {
    let cardWidth: string = '';
    let backgroundX: number = 0;

    const widthArr = data.currentWidth;
    const background: number[] = data.currentBackground;

    cardWidth = widthArr[index].toString();

    const word = child.component.innerHTML;
    const indexOfCorrectCard = data.currentSentence.indexOf(word);

    for (let i = 0; i < indexOfCorrectCard; i += 1) {
      backgroundX += background[i];
    }

    const sentenceIndex: number = data.sentenceIndex;

    const backgroundY = 65 * sentenceIndex;

    child.component.setAttribute(
      'style',
      `width:${cardWidth}%;
      background-position-x:${backgroundX}%;
      background-position-y: -${backgroundY}px`,
    );
    child.addAttribute(
      'style',
      `width:${cardWidth}%;
      background-position-x:${backgroundX}%;
      background-position-y: -${backgroundY}px`,
    );
    child.component.setAttribute('data_width', `width:${cardWidth}%`);
    child.addAttribute('data_width', `width:${cardWidth}%`);
  }
}

export const wordCardsField = new WordCardsField(currentMoveCardEvent);
