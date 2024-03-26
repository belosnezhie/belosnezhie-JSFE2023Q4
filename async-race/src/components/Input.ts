import { BaseComponent } from './Component';

export class Input extends BaseComponent {
  constructor(type: string, id: string, exstraClass: string, value?: string) {
    super({
      tag: 'input',
      className: 'input',
    });
    this.setAttribute('type', type);
    this.setAttribute('id', id);
    this.addClass(exstraClass);
    if (value) {
      this.setAttribute('value', value);
    }
  }
}
