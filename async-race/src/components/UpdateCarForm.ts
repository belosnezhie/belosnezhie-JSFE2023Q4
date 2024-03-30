// import { GarageCar } from '../services/DataTypes';

import { currentCarEvent } from '../services/EventEmitter';

import { Form } from './Form';
import { Input } from './Input';
// import { UpdateCarModelInput } from './UpdateCarModelInput';

export class UpdateCarForm extends Form {
  private carModelInput: Input;
  private colorInput: Input;

  constructor() {
    const colorInput = new Input('color', 'colorInput', 'color_input');

    colorInput.setAttribute('value', '#505d5f');
    const submitInput = new Input(
      'submit',
      'updateCar',
      'submit-input',
      'Update car',
    );
    // const options: GarageCar[] = garageCars;
    // const optionsInput = new UpdateCarModelInput(options, 'GarageCarTypes');
    const carModelInput = new Input(
      'text',
      'update_car_input',
      'update_car_input',
    );

    super('updateCarForm');

    this.append(carModelInput);
    this.append(colorInput);
    this.append(submitInput);

    this.carModelInput = carModelInput;
    this.colorInput = colorInput;

    this.addClass('update_car_form');
    this.addClass('disabled');

    currentCarEvent.subscribe('carWasSelected', () => {
      this.removeClass('disabled');

      // this.carModelInput.setAttribute('value', )
    });
  }
}
