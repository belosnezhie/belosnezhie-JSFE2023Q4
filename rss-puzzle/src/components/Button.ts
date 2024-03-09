import { BasicComponent } from './BasicComponent';

export class Button extends BasicComponent {
  constructor(innerText: string) {
    super({
      tag: 'button',
      className: '',
      text: innerText,
    });
  }
}
