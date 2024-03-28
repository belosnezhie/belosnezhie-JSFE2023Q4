import carTypes from '../data/Cars.json';
import { CarType } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { CreateCarModelInput } from './CreateCarModelInput';
import { Form } from './Form';
import { Input } from './Input';

export class CreateCarForm extends Form {
  constructor() {
    const colorInput = new Input('color', 'colorInput', 'color_input');

    colorInput.setAttribute('value', '#ea7619');
    colorInput.setAttribute('form', 'createCar');
    const submitInput = new Input(
      'submit',
      'createCar',
      'submit-input',
      'Create',
    );
    const options: CarType[] = carTypes;
    const optionsInput = new CreateCarModelInput(options, 'carTypes');

    optionsInput.setAttribute('form', 'createCar');

    super('createCarForm');

    this.append(optionsInput);
    this.append(colorInput);
    this.append(submitInput);

    this.setAttribute('id', 'createCar');
    this.setAttribute('action', 'http://127.0.0.1:3000/garage');
    this.setAttribute('method', 'POST');

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

      await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      currentCarEvent.emit('carWasCreated');

      // как показать в консоли что пришел успешный ответ?
      // const result: GarageCar[] = <GarageCar[]>await res.json();
    });
  }
}
