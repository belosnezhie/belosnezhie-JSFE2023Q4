import { CarField } from '../components/CarField';
import { GarageCar, TrafficParam } from '../services/DataTypes';

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

  public driveCar(driveParam: TrafficParam, carIndex: number) {
    const carField: CarField | undefined = this.findCarField(carIndex);

    if (carField !== undefined) {
      carField.driveCar(driveParam);
    }
  }

  private findCarField(carIndex: number): CarField | undefined {
    return this.carFields.find((carField) => {
      return Number(carField.getAttribute('data_id')) === carIndex;
    });
  }
}
