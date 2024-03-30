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
    const winnersCount: number = winnersService.shareMaxCount();
    const page: number = winnersService.shareCurrentPage();

    this.winnersPage = new WinnersPage(winners, winnersCount, page);

    this.root.append(this.winnersPage.getElement());
  }

  public removePage() {
    if (this.winnersPage instanceof WinnersPage) {
      this.winnersPage.removeElement();
    }
  }
}

export const winnersController = new WinnersController(document.body);
