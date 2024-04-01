import './WinnersPage.css';

import { Button } from '../components/Button';
import { BaseComponent } from '../components/Component';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { GarageCar, Winner } from '../services/DataTypes';
import { winnersController } from '../services/WinnersController';

export class WinnersPage extends BaseComponent {
  private winTable: Table;
  private nextButton: Button;
  private prevButton: Button;
  private currentPageTitle: BaseComponent;

  constructor(
    winners: Winner[],
    garageData: GarageCar[],
    hasMoreWinners: boolean,
    hasLessWinners: boolean,
    winnersCount: number,
    pageNumber: number,
  ) {
    const header = new Header('winners', 'Winners page');
    const winTable = new Table(winners, garageData);

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

    const pageWidgets = new BaseComponent({
      tag: 'div',
      className: 'page_widgets_container',
    });

    const nextButton = new Button('Next', 'next_page_button', async () =>
      winnersController.loadNextWinners(),
    );
    const prevButton = new Button('Prev', 'prev_page_button', async () =>
      winnersController.loadPrevWinners(),
    );

    if (!hasMoreWinners) {
      nextButton.addClass('disabled');
    }

    if (!hasLessWinners) {
      prevButton.addClass('disabled');
    }

    super(
      {
        tag: 'div',
        className: 'winners_page',
      },
      header,
      winnersCountTitle,
      currentPageTitle,
      pageWidgets,
      winTable,
    );

    this.winTable = winTable;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.currentPageTitle = currentPageTitle;

    pageWidgets.append(this.prevButton);
    pageWidgets.append(this.nextButton);
  }

  public reRender(
    winners: Winner[],
    garageData: GarageCar[],
    hasMoreWinners: boolean,
    hasLessWinners: boolean,
    pageNumber: number,
  ): void {
    this.winTable.removeElement();

    this.winTable = new Table(winners, garageData);

    this.nextButton.removeClass('disabled');
    this.prevButton.removeClass('disabled');
    if (!hasMoreWinners) {
      this.nextButton.addClass('disabled');
    }
    if (!hasLessWinners) {
      this.prevButton.addClass('disabled');
    }

    this.currentPageTitle.setTextContent(`Current page: ${pageNumber}`);

    this.append(this.winTable);
  }

  public reRenderTable(
    sortedWinners: Winner[],
    garageData: GarageCar[],
    sortValue: string,
    sortByWinsOrder: string,
  ) {
    this.winTable.removeElement();

    const newSortedTable = new Table(sortedWinners, garageData);

    this.winTable = newSortedTable;

    if (sortValue === 'wins') {
      this.winTable.showWinsSort(sortByWinsOrder);
    } else {
      this.winTable.showTimeSort(sortByWinsOrder);
    }

    this.append(newSortedTable);
  }
}
