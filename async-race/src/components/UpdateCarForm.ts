import { GarageCar } from '../services/DataTypes';

import { Form } from './Form';
import { Input } from './Input';
import { UpdateCarModelInput } from './UpdateCarModelInput';

export class UpdateCarForm extends Form {
  constructor(garageCars: GarageCar[]) {
    const colorInput = new Input('color', 'colorInput', 'color_input');
    const submitInput = new Input(
      'submit',
      'updateCar',
      'submit-input',
      'Submit',
    );
    const options: GarageCar[] = garageCars;
    const optionsInput = new UpdateCarModelInput(options, 'GarageCarTypes');

    super('updateCarForm');

    this.append(optionsInput);
    this.append(colorInput);
    this.append(submitInput);
  }
}
