import './WinnersPage.css';

import { BaseComponent } from '../components/Component';
import { Header } from '../components/Header';
import { Winner } from '../services/DataTypes';

export class WinnersPage extends BaseComponent {
  constructor(winners: Winner[], winnersCount: number, pageNumber: number) {
    const header = new Header('winners', 'Winners page');

    const winnersCountTitle = new BaseComponent({
      tag: 'h2',
      className: 'winners_count',
      text: `Winners count: ${winnersCount.toString()}`,
    });

    const currentPageTitle = new BaseComponent({
      tag: 'p',
      className: 'winners_page_count',
      text: `Current page: ${pageNumber}`,
    });

    super(
      {
        tag: 'div',
        className: 'winners_page',
      },
      header,
      winnersCountTitle,
      currentPageTitle,
    );
  }
}
