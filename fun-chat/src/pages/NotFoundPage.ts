import { BaseComponent } from '../components/Component';

export class NotFoundPage extends BaseComponent {
  constructor() {
    super(
      {
        tag: 'main',
        className: 'not_found_page',
      },
      new BaseComponent({
        tag: 'h1',
        className: 'not_found_title',
        text: 'Page is not found!',
      }),
    );
  }
}
