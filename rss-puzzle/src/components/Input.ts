import { BasicComponent } from './BasicComponent';

export class Input extends BasicComponent {
  constructor(inputName: string) {
    super({
      tag: 'input',
      className: 'input',
    });
    this.addAttribute('name', inputName);
  }

  public setPattern() {
    this.addAttribute('pattern', '^[A-Z][\\-a-zA-z]+$');
  }
}
