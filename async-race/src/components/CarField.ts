import { TrafficParam } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { Button } from './Button';
import { Car } from './Car';
import { BaseComponent } from './Component';

export class CarField extends BaseComponent {
  private car: Car;
  private startButton: Button;
  private stopButton: Button;
  private carIndex: number = 0;

  constructor(carModel: string, carColor: string, carId: number) {
    const carControllersContainer = new BaseComponent({
      tag: 'div',
      className: 'car_controllers_container',
    });

    const car = new Car(carColor, carId);

    const carContainer = new BaseComponent(
      {
        tag: 'div',
        className: 'car_container',
      },
      car,
    );

    const finishContainer = new BaseComponent({
      tag: 'div',
      className: 'finish_container',
    });

    const selectButton = new Button('Select', 'select_button', () => {
      currentCarEvent.emit('carWasSelected', this.carIndex);
    });

    const removeButton = new Button('Remove', 'remove_button', () => {
      currentCarEvent.emit('carWasRemoved', this.carIndex);
    });

    const carModelTitle = new BaseComponent({
      tag: 'p',
      className: 'car_model',
      text: carModel,
    });

    const startEngineButton = new Button('Start', 'start_engine_button', () => {
      currentCarEvent.emit('carWasStarted', this.carIndex);
      this.startButton.addClass('disabled');
    });

    const stopEngineButton = new Button('Stop', 'stop_engine_button', () => {
      currentCarEvent.emit('carWasStopped', this.carIndex);

      this.car.stop();

      this.stopButton.addClass('disabled');
      this.startButton.removeClass('disabled');
    });

    carModelTitle.setAttribute('style', `color: ${carColor}`);

    carControllersContainer.append(selectButton);
    carControllersContainer.append(removeButton);
    carControllersContainer.append(startEngineButton);
    carControllersContainer.append(stopEngineButton);
    carControllersContainer.append(carModelTitle);

    super(
      { tag: 'div', className: 'car_field' },
      carControllersContainer,
      carContainer,
      finishContainer,
    );

    this.car = car;
    this.carIndex = carId;
    this.startButton = startEngineButton;
    this.stopButton = stopEngineButton;
    this.setAttribute('data_id', `${carId}`);
    this.stopButton.addClass('disabled');
  }

  public driveCar(driveParam: TrafficParam) {
    const parentWidth = this.getWidth();

    if (this.car) {
      this.car.drive(driveParam, parentWidth);
    }
    this.stopButton.removeClass('disabled');
  }

  public brokeCar() {
    if (this.car) {
      this.car.broke();
    }
  }

  public stopCar() {
    this.car.stop();
  }

  private getWidth(): number {
    const element = this.getElement();

    return element.clientWidth;
  }
}
