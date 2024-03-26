import { BaseComponent } from './Component';

export class Form extends BaseComponent {
  constructor(name: string) {
    super({
      tag: 'form',
      className: 'form',
    });
    this.setAttribute('name', name);
  }
}
