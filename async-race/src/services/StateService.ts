// import { GaragePage } from '../pages/GaragePage';
// import { WinnersPage } from '../pages/WinnersPage';

import { carsController } from './CarsController';
import { winnersController } from './WinnersController';

class StateService {
  //   private currentPage: GaragePage | WinnersPage;

  async renderGaragePage() {
    winnersController.removePage();
    await carsController.renderPage();
  }

  async renderWinnersPage() {
    carsController.removePage();
    await winnersController.renderPage();
  }
}

export const stateService = new StateService();
