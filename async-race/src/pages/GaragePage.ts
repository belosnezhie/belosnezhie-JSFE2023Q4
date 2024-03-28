import './GaragePage.css';

import { Button } from '../components/Button';
import { CarsPage } from '../components/CarPage';
import { BaseComponent } from '../components/Component';
import { CreateCarForm } from '../components/CreateCarForm';
import { UpdateCarForm } from '../components/UpdateCarForm';
import { carsController } from '../services/CarsController';
import { GarageCar, TrafficParam } from '../services/DataTypes';

export class GaragePage extends BaseComponent {
  private carPage: CarsPage;
  private nextButton: Button;
  private prevButton: Button;
  private pageCount: BaseComponent;

  constructor(
    garageCars: GarageCar[],
    hasMoreCars: boolean,
    hasLessCars: boolean,
    pageNumber: number,
    cars: number,
  ) {
    // создала все контейнеры
    const controllersContainer = new BaseComponent({
      tag: 'div',
      className: 'garage_controllers_container',
    });

    const carsWidgets = new BaseComponent({
      tag: 'div',
      className: 'cars_widgets_container',
    });

    const pageWidgets = new BaseComponent({
      tag: 'div',
      className: 'page_widgets_container',
    });

    // создала все кнопки
    const generateCarsButton = new Button(
      'Generate cars',
      'generate_cars',
      () => {},
    );
    const raceButton = new Button('Rase', 'rase_button', () => {});
    const resetButton = new Button('Reset', 'reset_button', () => {});
    const carsCount = new BaseComponent({
      tag: 'p',
      className: 'page_counter',
      text: `Cars total: ${cars}`,
    });

    const nextButton = new Button('Next', 'next_page_button', async () =>
      carsController.loadNextCars(),
    );
    const prevButton = new Button('Prev', 'prev_page_button', async () =>
      carsController.loadPrevCars(),
    );
    const pageCount = new BaseComponent({
      tag: 'p',
      className: 'page_counter',
      text: `Current page: ${pageNumber}`,
    });

    // контроль кнопок страницы
    if (!hasMoreCars) {
      nextButton.addClass('disabled');
    }

    if (!hasLessCars) {
      prevButton.addClass('disabled');
    }

    const carPage = new CarsPage(garageCars);

    super(
      { tag: 'div', className: 'garage_page' },
      new CreateCarForm(),
      new UpdateCarForm(garageCars),
      controllersContainer,
      carPage,
    );

    this.carPage = carPage;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.pageCount = pageCount;

    // присоединяю кнопки к контейнерам
    carsWidgets.append(carsCount);
    carsWidgets.append(raceButton);
    carsWidgets.append(resetButton);
    carsWidgets.append(generateCarsButton);

    pageWidgets.append(this.pageCount);
    pageWidgets.append(this.prevButton);
    pageWidgets.append(this.nextButton);

    // присоединяю виджеты к контейнеру
    controllersContainer.append(carsWidgets);
    controllersContainer.append(pageWidgets);
  }

  public reRender(
    garageCars: GarageCar[],
    hasMoreCars: boolean,
    hasLessCars: boolean,
    pageNumber: number,
  ): void {
    this.carPage.removeElement();

    this.carPage = new CarsPage(garageCars);

    this.nextButton.removeClass('disabled');
    this.prevButton.removeClass('disabled');
    if (!hasMoreCars) {
      this.nextButton.addClass('disabled');
    }
    if (!hasLessCars) {
      this.prevButton.addClass('disabled');
    }

    this.pageCount.setTextContent(`Current page: ${pageNumber}`);

    this.append(this.carPage);
  }

  public driveCar(driveParam: TrafficParam, carIndex: number) {
    if (this.carPage) {
      this.carPage.driveCar(driveParam, carIndex);
    }
  }
}
