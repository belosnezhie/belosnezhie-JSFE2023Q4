import { CarField } from '../components/CarField';
import { GarageCar, TrafficParam } from '../data/DataTypes';

import { BaseComponent } from './Component';

export class CarsPage extends BaseComponent {
  private carFields: CarField[];

  constructor(garageCars: GarageCar[]) {
    const carFields = garageCars.map((car) => {
      return new CarField(car.name, car.color, car.id);
    });

    super(
      {
        tag: 'div',
        className: 'cars_page',
      },
      ...carFields,
    );
    this.carFields = carFields;
  }

  public getAllCarsID(): number[] {
    const currentCarsID: number[] = [];

    this.carFields.forEach((carField) => {
      const id = carField.getAttribute('data_id');

      currentCarsID.push(Number(id));
    });

    return currentCarsID;
  }

  public driveCar(driveParam: TrafficParam, carIndex: number) {
    const carField: CarField | undefined = this.findCarField(carIndex);

    if (carField !== undefined) {
      carField.driveCar(driveParam);
    }
  }

  public brokeCar(carIndex: number) {
    const carField: CarField | undefined = this.findCarField(carIndex);

    if (carField !== undefined) {
      carField.brokeCar();
    }
  }

  public stopCars() {
    this.carFields.forEach((carField) => {
      carField.stopCar();
    });
  }

  public enableCarButtons() {
    this.carFields.forEach((carField) => {
      carField.enableButtons();
    });
  }

  public disableCarButtons() {
    this.carFields.forEach((carField) => {
      carField.disableButtons();
    });
  }

  private findCarField(carIndex: number): CarField | undefined {
    return this.carFields.find((carField) => {
      return Number(carField.getAttribute('data_id')) === carIndex;
    });
  }
}
