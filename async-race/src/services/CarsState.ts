import { GaragePage } from '../pages/GaragePage';

import { getGarageCars } from './CarService';

export class CarsState {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public async renderPage(): Promise<void> {
    const cars = await getGarageCars();

    const garagePage = new GaragePage(cars);

    this.root.append(garagePage.getElement());
  }
}

export const state = new CarsState(document.body);
