import { Button } from './Button';
import { BaseComponent } from './Component';

export class Header extends BaseComponent {
  private currentPage: string;
  private garagePageButton: Button;
  private winnersPageButton: Button;

  constructor(currentPage: string, title: string) {
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

    this.currentPage = currentPage;
    this.garagePageButton = garagePageButton;
    this.winnersPageButton = winnersPageButton;

    if (this.currentPage === 'garage') {
      this.garagePageButton.addClass('disabled');
    } else {
      this.winnersPageButton.addClass('disabled');
    }
  }
}
