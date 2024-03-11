import { BasicComponent } from './BasicComponent';

export class Headline extends BasicComponent {
  constructor(tag: string, className: string, text?: string) {
    super({
      tag: tag,
      className: className,
      text: text,
    });
  }
}
