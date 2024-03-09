import { BasicComponent } from './BasicComponent';

export class Label extends BasicComponent {
  constructor(inputText: string, forValue: string) {
    super({
      tag: 'label',
      className: 'label',
      text: inputText,
    });
    this.addAttribute('for', forValue);
  }
}
