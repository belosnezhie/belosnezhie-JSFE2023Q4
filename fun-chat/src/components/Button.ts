import { BaseComponent } from './Component';

export class Button extends BaseComponent {
  onClick: () => void;

  constructor(innerText: string, buttonClass: string, onClick: () => void) {
    super({
      tag: 'button',
      className: 'button',
      text: innerText,
    });
    this.addClass(buttonClass);
    this.onClick = onClick;
    this.addListener('click', this.onClick);
  }

  removeElement() {
    this.removeListener('click', this.onClick);
    super.removeElement();
  }
}
