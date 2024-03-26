import './GaragePage.css';

import { Button } from '../components/Button';
import { CarField } from '../components/CarField';
import { BaseComponent } from '../components/Component';
import { CreateCarForm } from '../components/CreateCarForm';
import { UpdateCarForm } from '../components/UpdateCarForm';
import { GarageCar } from '../services/DataTypes';

export class GaragePage extends BaseComponent {
  constructor(garageCars: GarageCar[]) {
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

    const carFields = garageCars.map((car) => {
      return new CarField(car.name, car.color);
    });

    super(
      { tag: 'div', className: 'garage_page' },
      new CreateCarForm(),
      new UpdateCarForm(garageCars),
      buttonsContainer,
      ...carFields,
    );

    buttonsContainer.append(raceButton);
    buttonsContainer.append(resetButton);
    buttonsContainer.append(generateCarsButton);
  }
}
