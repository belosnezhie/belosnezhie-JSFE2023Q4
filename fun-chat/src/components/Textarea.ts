import { BaseComponent } from './Component';

export class Textarea extends BaseComponent {
  constructor(type: string, id: string, exstraClass: string, value?: string) {
    super({
      tag: 'textarea',
      className: 'textarea',
    });
    this.setAttribute('type', type);
    this.setAttribute('id', id);
    this.addClass(exstraClass);
    if (value) {
      this.setTextContent(value);
    }
    this.setAttribute('wrap', 'soft');
    this.setAttribute('rows', '3');

    this.addListener('input', () => {
      this.setAttribute('style', `height: ${this.getElement().scrollHeight}px`);
    });
  }
}
