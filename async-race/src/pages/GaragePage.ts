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
  private raceButton: Button;
  private resetButton: Button;
  private generateCarsButton: Button;
  private pageCount: BaseComponent;
  private winMessage: BaseComponent | undefined = undefined;
  private updateCarForm: UpdateCarForm;
  private createCarForm: CreateCarForm;

  constructor(
    garageCars: GarageCar[],
    hasMoreCars: boolean,
    hasLessCars: boolean,
    pageNumber: number,
    cars: number,
  ) {
    const header = new Header('garage', 'Garage page');

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

    const generateCarsButton = new Button(
      'Generate cars',
      'generate_cars',
      () => {
        currentCarEvent.emit('generateCars');
      },
    );
    const raceButton = new Button('Race', 'race_button', () => {
      this.raceButton.addClass('disabled');
      this.disableReRenderButtons();
      this.carPage.disableCarButtons();
      currentCarEvent.emit('startRace');

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
      });

      this.carPage.stopCars();
      this.raceButton.removeClass('disabled');
      this.carPage.enableCarButtons();
      this.enableReRenderButtons();
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

    if (!hasMoreCars) {
      nextButton.addClass('disabled');
    }

    if (!hasLessCars) {
      prevButton.addClass('disabled');
    }

    const carPage = new CarsPage(garageCars);

    const updateCarForm = new UpdateCarForm();
    const createCarForm = new CreateCarForm();

    super(
      { tag: 'div', className: 'garage_page' },
      header,
      createCarForm,
      updateCarForm,
      controllersContainer,
      carPage,
    );

    this.updateCarForm = updateCarForm;
    this.createCarForm = createCarForm;
    this.carPage = carPage;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.raceButton = raceButton;
    this.resetButton = resetButton;
    this.generateCarsButton = generateCarsButton;
    this.pageCount = pageCount;

    carsWidgets.append(carsCount);
    carsWidgets.append(raceButton);
    carsWidgets.append(resetButton);
    carsWidgets.append(generateCarsButton);

    pageWidgets.append(this.pageCount);
    pageWidgets.append(this.prevButton);
    pageWidgets.append(this.nextButton);

    controllersContainer.append(carsWidgets);
    controllersContainer.append(pageWidgets);

    this.resetButton.addClass('disabled');

    this.addListener('click', () => {
      if (this.winMessage) {
        this.winMessage.removeElement();
      }
    });
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

  public showWinner(carModel: string, time: number) {
    const winMessage = new BaseComponent({
      tag: 'h2',
      className: 'win_message',
      text: `${carModel} went first in ${time.toFixed(3)} seconds!`,
    });

    winMessage.addClass('appear');
    this.winMessage = winMessage;
    this.append(winMessage);
  }

  public updateCar(car: GarageCar) {
    this.updateCarForm.updateCar(car);
  }

  public enableReRenderButtons() {
    this.createCarForm.removeClass('disabled');
    this.generateCarsButton.removeClass('disabled');
  }

  private disableReRenderButtons() {
    this.createCarForm.addClass('disabled');
    this.generateCarsButton.addClass('disabled');
  }
}
