import { GaragePage } from '../pages/GaragePage';

import { carService } from './CarService';
import { currentCarEvent } from './EventEmmiter';

export class CarsController {
  private root: HTMLElement;
  private garagePage: GaragePage | undefined;

  constructor(root: HTMLElement) {
    this.root = root;
    this.garagePage = undefined;

    currentCarEvent.subscribe('carWasCreated', async () => {
      this.garagePage?.removeElement();
      await this.renderPage();
    });
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
}

export const carsController = new CarsController(document.body);
