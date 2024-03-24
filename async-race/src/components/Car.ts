import { BaseComponent } from './Component';

export class Car extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: 'car', text: 'Tesla' });
  }
}
