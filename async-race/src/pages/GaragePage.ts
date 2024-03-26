import './GaragePage.css';

import { Button } from '../components/Button';
import { CarField } from '../components/CarField';
import { BaseComponent } from '../components/Component';
import { CreateCarForm } from '../components/CreateCarForm';
import { Select } from '../components/Select';
import { GarageCar } from '../services/DataTypes';

export class GaragePage extends BaseComponent {
  constructor(garageCars: GarageCar[]) {
    const buttonsContainer = new BaseComponent({
      tag: 'div',
      className: 'controllers_container',
    });
    const carSelect = new Select('tesla', 'car_select', garageCars);
    const colorSelect = new Select('green', 'color_select');
    const generateCarsButton = new Button(
      'Generate cars',
      'generate_cars',
      () => {},
    );
    const raceButton = new Button('Rase', 'rase_button', () => {});
    const resetButton = new Button('Reset', 'reset_button', () => {});

    const carFields = garageCars.map((car) => {
      return new CarField(car.name);
    });

    super(
      { tag: 'div', className: 'garage_page' },
      new CreateCarForm(),
      buttonsContainer,
      ...carFields,
    );

    buttonsContainer.append(carSelect);
    buttonsContainer.append(colorSelect);
    buttonsContainer.append(raceButton);
    buttonsContainer.append(resetButton);
    buttonsContainer.append(generateCarsButton);
  }
}
