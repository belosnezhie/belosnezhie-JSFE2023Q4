// import { GaragePage } from '../pages/GaragePage';
// import { WinnersPage } from '../pages/WinnersPage';

import { carsController } from './CarsController';
import { winnersController } from './WinnersController';

class StateService {
  //   private currentPage: GaragePage | WinnersPage;

  async renderGaragePage() {
    await carsController.renderPage();
  }

  public showGaragePage() {
    winnersController.removePage();
    carsController.showPage();
  }

  async showWinnersPage() {
    carsController.hidePage();
    await winnersController.renderPage();
  }
}

export const stateService = new StateService();
