import './GaragePage.css';

import { Button } from '../components/Button';
import { CarsPage } from '../components/CarPage';
import { BaseComponent } from '../components/Component';
import { CreateCarForm } from '../components/CreateCarForm';
import { Header } from '../components/Header';
import { UpdateCarForm } from '../components/UpdateCarForm';
import { carsController } from '../services/CarsController';
import { GarageCar, TrafficParam } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

export class GaragePage extends BaseComponent {
  private carPage: CarsPage;
  private nextButton: Button;
  private prevButton: Button;
  private raseButton: Button;
  private resetButton: Button;
  private pageCount: BaseComponent;

  constructor(
    garageCars: GarageCar[],
    hasMoreCars: boolean,
    hasLessCars: boolean,
    pageNumber: number,
    cars: number,
  ) {
    const header = new Header('garage', 'Garage page');

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
    const raceButton = new Button('Rase', 'rase_button', () => {
      this.raseButton.addClass('disabled');

      const currentCarsID = this.carPage.getAllCarsID();

      currentCarsID.forEach((id) => {
        currentCarEvent.emit('carWasStarted', id);
      });

      this.resetButton.removeClass('disabled');
    });

    const resetButton = new Button('Reset', 'reset_button', () => {
      this.resetButton.addClass('disabled');
      const currentCarsID = this.carPage.getAllCarsID();

      currentCarsID.forEach((id) => {
        currentCarEvent.emit('carWasStopped', id);
        this.carPage.stopCars();
      });

      this.raseButton.removeClass('disabled');
    });

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
      header,
      new CreateCarForm(),
      new UpdateCarForm(garageCars),
      controllersContainer,
      carPage,
    );

    this.carPage = carPage;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.raseButton = raceButton;
    this.resetButton = resetButton;
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

    this.resetButton.addClass('disabled');
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

  public brokeCar(carIndex: number) {
    if (this.carPage) {
      this.carPage.brokeCar(carIndex);
    }
  }
}
