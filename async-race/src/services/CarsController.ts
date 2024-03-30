import { GaragePage } from '../pages/GaragePage';

import { carService } from './CarService';
import { currentCarEvent } from './EventEmitter';

export class CarsController {
  private root: HTMLElement;
  private garagePage: GaragePage | undefined;

  constructor(root: HTMLElement) {
    this.root = root;
    this.garagePage = undefined;

    currentCarEvent.subscribeAsync('carWasCreated', async () => {
      await this.reRenderGaragePage();
    });

    currentCarEvent.subscribeAsync('carWasRemoved', async (carIndex) => {
      if (typeof carIndex === 'number') {
        await carService.removeCar(carIndex);
      }

      await this.reRenderGaragePage();
    });

    currentCarEvent.subscribeAsync('carWasStarted', async (carIndex) => {
      if (typeof carIndex !== 'number') {
        throw new Error('Index is not defind');
      }
      if (!this.garagePage) {
        throw new Error('GaragePage is not defind');
      }

      const driveParam = await carService.startEngine(carIndex);

      this.garagePage.driveCar(driveParam, carIndex);

      const isBroken = await carService.isEngineBroken(carIndex);

      if (isBroken) {
        this.garagePage.brokeCar(carIndex);
      }
    });

    currentCarEvent.subscribeAsync('carWasStopped', async (carIndex) => {
      if (typeof carIndex !== 'number') {
        throw new Error('Index is not defind');
      }
      carService.abortRequest();
      await carService.stopEngine(carIndex);
    });

    // currentCarEvent.subscribeAsync('carIsDriving', async (carIndex) => {
    //   if (typeof carIndex !== 'number') {
    //     throw new Error('Index is not defind');
    //   }
    //   const brokeParam = await carService.startEngine(carIndex);
    // });
  }

  public async renderPage(): Promise<void> {
    const cars = await carService.getGarageCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();
    const carsCount: number = carService.shareMaxCount();
    const page: number = carService.shareCurrentPage();

    this.garagePage = new GaragePage(
      cars,
      hasMoreCars,
      hasLessCars,
      page,
      carsCount,
    );

    this.root.append(this.garagePage.getElement());
  }

  public async loadNextCars(): Promise<void> {
    const cars = await carService.getNextCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();
    const page: number = carService.shareCurrentPage();

    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRender(cars, hasMoreCars, hasLessCars, page);
    }
  }

  public async loadPrevCars(): Promise<void> {
    const cars = await carService.getPrevCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();
    const page: number = carService.shareCurrentPage();

    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRender(cars, hasMoreCars, hasLessCars, page);
    }
  }

  public removePage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.removeElement();
    }
  }

  public reRender() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRenderComponent();
    }
  }

  public hidePage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.setAttribute('style', 'display: none');
    }
  }

  public showPage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.setAttribute('style', 'display: flex');
    }
  }

  private async reRenderGaragePage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.removeElement();
    }
    await this.renderPage();
  }
}

export const carsController = new CarsController(document.body);
