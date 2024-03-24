import { GarageCar } from '../services/DataTypes';

import { BaseComponent } from './Component';

export class Select extends BaseComponent {
  constructor(
    innerText: string,
    selectClass: string,
    garageCars?: GarageCar[],
  ) {
    let options: BaseComponent[] = [];

    if (garageCars) {
      options = garageCars.map((car) => {
        return new BaseComponent({
          tag: 'option',
          className: 'car_options',
          text: car.name,
        });
      });
    }

    super({ tag: 'select', className: 'select', text: innerText }, ...options);
    this.addClass(selectClass);
  }
}
