import { CarField } from '../components/CarField';
import { GarageCar } from '../services/DataTypes';

import { BaseComponent } from './Component';

export class CarsPage extends BaseComponent {
  constructor(garageCars: GarageCar[]) {
    const carFields = garageCars.map((car) => {
      return new CarField(car.name, car.color);
    });

    super(
      {
        tag: 'div',
        className: 'cars_page',
      },
      ...carFields,
    );
  }
}
