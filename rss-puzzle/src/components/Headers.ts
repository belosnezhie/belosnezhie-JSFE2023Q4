import { BasicComponent } from './BasicComponent';

export class Header extends BasicComponent {
  constructor(tag: string, className: string, text: string) {
    super({
      tag: tag,
      className: className,
      text: text,
    });
  }
}
