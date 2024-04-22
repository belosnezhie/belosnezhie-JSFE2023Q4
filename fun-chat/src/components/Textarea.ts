import { BaseComponent } from './Component';

export class Input extends BaseComponent {
  private onChange?: (event: Event) => void;

  constructor(
    type: string,
    id: string,
    exstraClass: string,
    value?: string,
    onChange?: (event: Event) => void,
  ) {
    super({
      tag: 'textarea',
      className: 'textarea',
    });
    this.setAttribute('type', type);
    this.setAttribute('id', id);
    this.addClass(exstraClass);
    if (value) {
      this.setAttribute('value', value);
    }

    if (onChange) {
      this.onChange = onChange;
      this.addListener('input', this.onChange);
    }
  }
}
