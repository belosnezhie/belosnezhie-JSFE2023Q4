import './GaragePage.css';

import { Button } from '../components/Button';
import { CarsPage } from '../components/CarPage';
import { BaseComponent } from '../components/Component';
import { CreateCarForm } from '../components/CreateCarForm';
import { UpdateCarForm } from '../components/UpdateCarForm';
import { carsController } from '../services/CarsController';
import { GarageCar } from '../services/DataTypes';

export class GaragePage extends BaseComponent {
  private carPage: CarsPage;
  private nextButton: Button;

  constructor(garageCars: GarageCar[], hasMoreCars: boolean) {
    const buttonsContainer = new BaseComponent({
      tag: 'div',
      className: 'controllers_container',
    });
    const generateCarsButton = new Button(
      'Generate cars',
      'generate_cars',
      () => {},
    );
    const raceButton = new Button('Rase', 'rase_button', () => {});
    const resetButton = new Button('Reset', 'reset_button', () => {});
    const nextButton = new Button('Next', 'next_page_button', async () =>
      carsController.loadNextCars(),
    );

    if (!hasMoreCars) {
      nextButton.addClass('disabled');
    }

    const carPage = new CarsPage(garageCars);

    super(
      { tag: 'div', className: 'garage_page' },
      new CreateCarForm(),
      new UpdateCarForm(garageCars),
      buttonsContainer,
      carPage,
      nextButton,
    );

    this.carPage = carPage;
    this.nextButton = nextButton;

    buttonsContainer.append(raceButton);
    buttonsContainer.append(resetButton);
    buttonsContainer.append(generateCarsButton);
  }

  public reRender(garageCars: GarageCar[], hasMoreCars: boolean): void {
    this.carPage.removeElement();
    this.nextButton.removeElement();

    this.carPage = new CarsPage(garageCars);
    this.nextButton = new Button('Next', 'next_page_button', async () =>
      carsController.loadNextCars(),
    );

    if (!hasMoreCars) {
      this.nextButton.addClass('disabled');
    }

    this.append(this.carPage);
    this.append(this.nextButton);
  }
}
