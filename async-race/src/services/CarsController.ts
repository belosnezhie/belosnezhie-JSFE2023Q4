import { GaragePage } from '../pages/GaragePage';

import { carService } from './CarService';

export class CarsController {
  private root: HTMLElement;
  private garagePage: GaragePage | undefined;

  constructor(root: HTMLElement) {
    this.root = root;
    this.garagePage = undefined;
  }

  public async renderPage(): Promise<void> {
    const cars = await carService.getGarageCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();

    this.garagePage = new GaragePage(cars, hasMoreCars, hasLessCars);

    this.root.append(this.garagePage.getElement());
  }

  public async loadNextCars(): Promise<void> {
    const cars = await carService.getNextCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();

    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRender(cars, hasMoreCars, hasLessCars);
    }
  }

  public async loadPrevCars(): Promise<void> {
    const cars = await carService.getPrevCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();

    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRender(cars, hasMoreCars, hasLessCars);
    }
  }
}

export const carsController = new CarsController(document.body);
