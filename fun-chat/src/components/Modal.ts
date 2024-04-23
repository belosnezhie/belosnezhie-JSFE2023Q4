import { BaseComponent } from './Component';

export class ModalWindow extends BaseComponent {
  constructor(message: string) {
    const content = new BaseComponent({
      tag: 'div',
      className: 'modal',
      text: message,
    });

    super(
      {
        tag: 'div',
        className: 'shadow_wrapper',
      },
      content,
    );
  }
}
