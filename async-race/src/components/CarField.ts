import { TrafficParam } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { Button } from './Button';
import { Car } from './Car';
import { BaseComponent } from './Component';

export class CarField extends BaseComponent {
  private car: Car;
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

    const selectButton = new Button('Select', 'select_button', () => {});

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
    });
    const stopEngineButton = new Button('Stop', 'stop_engine_button', () => {
      currentCarEvent.emit('carWasStoped', this.carIndex);

      this.car.stop();
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
    this.setAttribute('data_id', `${carId}`);
  }

  public driveCar(driveParam: TrafficParam) {
    const parentWidth = this.getWidth();

    if (this.car) {
      this.car.drive(driveParam, parentWidth);
    }
  }

  public brokeCar() {
    if (this.car) {
      this.car.broke();
    }
  }

  private getWidth(): number {
    const element = this.getElement();

    return element.clientWidth;
  }
}
