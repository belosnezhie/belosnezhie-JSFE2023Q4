import { WinnersPage } from '../pages/WinnersPage';

import { Winner } from './DataTypes';
import { winnersService } from './WinnersService';

class WinnersController {
  private root: HTMLElement;
  private winnersPage: WinnersPage | undefined;

  constructor(root: HTMLElement) {
    this.root = root;
    this.winnersPage = undefined;
  }

  public async renderPage(): Promise<void> {
    const winners: Winner[] = await winnersService.getWinners();
    const hasMoreWinners: boolean = winnersService.hasMoreWinners();
    const hasLessWinners: boolean = winnersService.hasLessWinners();
    const winnersCount: number = winnersService.shareMaxCount();
    const page: number = winnersService.shareCurrentPage();

    this.winnersPage = new WinnersPage(
      winners,
      hasMoreWinners,
      hasLessWinners,
      winnersCount,
      page,
    );

    this.root.append(this.winnersPage.getElement());
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
      this.winnersPage.setAttribute('style', 'display: block');
    }
  }

  public async loadNextWinners(): Promise<void> {
    const winners = await winnersService.getNextWinners();
    const hasMoreWinners: boolean = winnersService.hasMoreWinners();
    const hasLessWinners: boolean = winnersService.hasLessWinners();
    const page: number = winnersService.shareCurrentPage();

    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.reRender(winners, hasMoreWinners, hasLessWinners, page);
    }
  }

  public async loadPrevWinners(): Promise<void> {
    const winners = await winnersService.getPrevWinners();
    const hasMoreWinners: boolean = winnersService.hasMoreWinners();
    const hasLessWinners: boolean = winnersService.hasLessWinners();
    const page: number = winnersService.shareCurrentPage();

    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.reRender(winners, hasMoreWinners, hasLessWinners, page);
    }
  }
}

export const winnersController = new WinnersController(document.body);
