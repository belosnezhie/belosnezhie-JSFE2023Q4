import { BaseComponent } from './Component';

export class Footer extends BaseComponent {
  constructor() {
    const logo = new BaseComponent({ tag: 'div', className: 'footer_logo' });
    const year = new BaseComponent({
      tag: 'p',
      className: 'footer_year',
      text: '2024',
    });
    const authorLink = new BaseComponent({
      tag: 'a',
      className: 'autor_link',
      text: 'Maria Treier',
    });

    authorLink.setAttribute('href', 'https://github.com/belosnezhie');
    authorLink.setAttribute('target', '_blank');

    super(
      {
        tag: 'footer',
        className: 'main_footer',
      },
      logo,
      year,
      authorLink,
    );
  }
}
