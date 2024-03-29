import { Button } from './Button';
import { BaseComponent } from './Component';

export class Header extends BaseComponent {
  constructor(title: string) {
    const pageTitle = new BaseComponent({
      tag: 'h1',
      className: 'page_title',
      text: title,
    });

    const garagePageButton = new Button(
      'Garage Page',
      'garage_page_button',
      () => {},
    );

    const winnersPageButton = new Button(
      'Winners Page',
      'winners_page_button',
      () => {},
    );

    super(
      { tag: 'div', className: 'header' },
      pageTitle,
      new BaseComponent(
        {
          tag: 'div',
          className: 'header_buttons_container',
        },
        garagePageButton,
        winnersPageButton,
      ),
    );
  }
}
