// import { GarageCar } from '../services/DataTypes';

import { GarageCar } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { Form } from './Form';
import { Input } from './Input';
// import { UpdateCarModelInput } from './UpdateCarModelInput';

export class UpdateCarForm extends Form {
  private carID: number | undefined = undefined;
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

    this.addListener('submit', async (event: Event) => {
      event.preventDefault();
      const target: HTMLFormElement = event.target as HTMLFormElement;
      const model = target.elements[0] as HTMLInputElement;
      const modelValue: string = model.value;
      const color = target.elements[1] as HTMLInputElement;
      const colorValue: string = color.value;
      const data = {
        name: modelValue,
        color: colorValue,
      };

      if (this.carID === undefined) {
        throw new Error('Car is not defind!');
      }

      await fetch(`http://127.0.0.1:3000/garage/${this.carID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      currentCarEvent.emit('carWasUpdated');
    });
  }

  public updateCar(carData: GarageCar) {
    this.carID = carData.id;

    this.removeClass('disabled');

    const model: string = carData.name;
    const color: string = carData.color;

    this.carModelInput.setAttribute('value', model);
    this.colorInput.setAttribute('value', color);
  }
}
