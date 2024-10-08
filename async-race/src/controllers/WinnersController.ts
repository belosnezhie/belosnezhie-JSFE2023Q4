import { GarageCar, Winner } from '../data/DataTypes';
import { WinnersPage } from '../pages/WinnersPage';
import { currentCarEvent } from '../services/EventEmitter';
import { stateService } from '../services/StateService';
import { winnersService } from '../services/WinnersService';

class WinnersController {
  private root: HTMLElement;
  private winnersPage: WinnersPage | undefined;
  private sortByWinsOrder: string = 'ASC';
  private sortByTimeOrder: string = 'ASC';

  constructor(root: HTMLElement) {
    this.root = root;
    this.winnersPage = undefined;

    currentCarEvent.subscribeAsync('sortWinnersByWins', async () => {
      if (!this.winnersPage) {
        throw new Error('WinnersPage is not defind');
      }

      const sortOrder: string = 'wins';

      const sortedWinners = await winnersService.sortWinners(
        sortOrder,
        this.sortByWinsOrder,
      );
      const garageData: GarageCar[] =
        await winnersService.getGarageData(sortedWinners);

      this.winnersPage.reRenderTable(
        sortedWinners,
        garageData,
        sortOrder,
        this.sortByWinsOrder,
      );

      if (this.sortByWinsOrder === 'ASC') {
        this.sortByWinsOrder = 'DESC';
      } else {
        this.sortByWinsOrder = 'ASC';
      }
    });

    currentCarEvent.subscribeAsync('sortWinnersByTime', async () => {
      if (!this.winnersPage) {
        throw new Error('WinnersPage is not defind');
      }

      const sortby: string = 'time';

      const sortedWinners = await winnersService.sortWinners(
        sortby,
        this.sortByTimeOrder,
      );
      const garageData: GarageCar[] =
        await winnersService.getGarageData(sortedWinners);

      this.winnersPage.reRenderTable(
        sortedWinners,
        garageData,
        sortby,
        this.sortByTimeOrder,
      );

      if (this.sortByTimeOrder === 'ASC') {
        this.sortByTimeOrder = 'DESC';
      } else {
        this.sortByTimeOrder = 'ASC';
      }
    });

    currentCarEvent.subscribeAsyncWithTime('winnerWasDifined', async () => {
      await this.reRenderWinnersPage();
      stateService.showGaragePage();
    });

    currentCarEvent.subscribeAsync('winnerWasRemoved', async () => {
      await this.reRenderWinnersPage();
      stateService.showGaragePage();
    });

    currentCarEvent.subscribeAsync('winnerWasUpdated', async () => {
      await this.reRenderWinnersPage();
      stateService.showGaragePage();
    });
  }

  public async renderPage(): Promise<WinnersPage> {
    const winners: Winner[] = await winnersService.getWinners();
    const garageData: GarageCar[] = await winnersService.getGarageData(winners);
    const hasMoreWinners: boolean = winnersService.hasMoreWinners();
    const hasLessWinners: boolean = winnersService.hasLessWinners();
    const winnersCount: number = winnersService.shareMaxCount();
    const page: number = winnersService.shareCurrentPage();

    this.winnersPage = new WinnersPage(
      winners,
      garageData,
      hasMoreWinners,
      hasLessWinners,
      winnersCount,
      page,
    );

    this.root.append(this.winnersPage.getElement());

    return this.winnersPage;
  }

  public removePage() {
    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.removeElement();
    }
  }

  public hidePage() {
    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.setAttribute('style', 'display: none');
    }
  }

  public showPage() {
    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.setAttribute('style', 'display: flex');
    }
  }

  private async reRenderWinnersPage() {
    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.removeElement();
    }
    await this.renderPage();
  }

  public async loadNextWinners(): Promise<void> {
    const winners = await winnersService.getNextWinners();
    const garageData: GarageCar[] = await winnersService.getGarageData(winners);
    const hasMoreWinners: boolean = winnersService.hasMoreWinners();
    const hasLessWinners: boolean = winnersService.hasLessWinners();
    const page: number = winnersService.shareCurrentPage();

    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.reRender(
        winners,
        garageData,
        hasMoreWinners,
        hasLessWinners,
        page,
      );
    }
  }

  public async loadPrevWinners(): Promise<void> {
    const winners = await winnersService.getPrevWinners();
    const garageData: GarageCar[] = await winnersService.getGarageData(winners);
    const hasMoreWinners: boolean = winnersService.hasMoreWinners();
    const hasLessWinners: boolean = winnersService.hasLessWinners();
    const page: number = winnersService.shareCurrentPage();

    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.reRender(
        winners,
        garageData,
        hasMoreWinners,
        hasLessWinners,
        page,
      );
    }
  }
}

export const winnersController = new WinnersController(document.body);
