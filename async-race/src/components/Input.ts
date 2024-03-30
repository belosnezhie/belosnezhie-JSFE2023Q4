import { BaseComponent } from './Component';

export class Input extends BaseComponent {
  // public inputValue: string = '';

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

    this.addListener('change', (event: Event) => {
      const target: HTMLInputElement = <HTMLInputElement>event.target;
      const inputValue: string = target.value;

      // this.inputValue = inputValue;
      this.setAttribute('value', inputValue);
    });
  }
}
