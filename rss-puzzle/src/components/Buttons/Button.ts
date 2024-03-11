import './Buttons.css';

import { BasicComponent } from '../BasicComponent';

export class Button extends BasicComponent {
  onClick?: () => void;

  constructor(innerText: string, buttonClass: string, onClick?: () => void) {
    super({
      tag: 'button',
      className: 'button',
      text: innerText,
    });
    this.addClass(buttonClass);
    this.onClick = onClick;
  }

  public render(): void {
    super.render();
    if (this.onClick) {
      this.component.addEventListener('click', this.onClick);
    }
  }
}
