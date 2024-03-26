import carTypes from '../data/Cars.json';
import { CarType } from '../services/DataTypes';

import { CreateCarModelInput } from './CreateCarModelInput';
import { Form } from './Form';
import { Input } from './Input';

export class CreateCarForm extends Form {
  constructor() {
    const colorInput = new Input('color', 'colorInput', 'color_input');
    const submitInput = new Input(
      'submit',
      'createCar',
      'submit-input',
      'Submit',
    );
    const options: CarType[] = carTypes;
    const optionsInput = new CreateCarModelInput(options, 'carTypes');

    super('createCarForm');

    this.append(optionsInput);
    this.append(colorInput);
    this.append(submitInput);
  }
}
