import { GaragePage } from '../pages/GaragePage';
import { WinnersPage } from '../pages/WinnersPage';

import { carsController } from './CarsController';
import { winnersController } from './WinnersController';

class StateService {
  private garagePage: GaragePage | undefined = undefined;
  private winnersPage: WinnersPage | undefined = undefined;

  async renderApp() {
    this.garagePage = await carsController.renderPage();
    this.winnersPage = await winnersController.renderPage();

    this.showGaragePage();
  }

  public showGaragePage() {
    winnersController.hidePage();
    carsController.showPage();
  }

  public showWinnersPage() {
    carsController.hidePage();
    winnersController.showPage();
  }
}

export const stateService = new StateService();
