import carTypes from '../data/Cars.json';
import { CarType } from '../data/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { Car } from './Car';
import { CreateCarModelInput } from './CreateCarModelInput';
import { Form } from './Form';
import { Input } from './Input';

export class CreateCarForm extends Form {
  private carModelInput: Input;
  private colorInput: Input;
  private car: Car;
  private color: string = '#ea7619';

  constructor() {
    const colorInput = new Input(
      'color',
      'colorInput',
      'color_input',
      '#ea7619',
      (event: Event) => {
        const target: HTMLInputElement = <HTMLInputElement>event.target;
        const colorValue: string = target.value;

        this.color = colorValue;
        this.updatePreviewCarColor();
      },
    );

    colorInput.setAttribute('form', 'createCar');
    const submitInput = new Input(
      'submit',
      'createCar',
      'submit-input',
      'Create',
    );
    const options: CarType[] = carTypes;
    const optionsInput = new CreateCarModelInput(options, 'carTypes');

    const car = new Car('#ea7619', 0);

    optionsInput.setAttribute('form', 'createCar');

    super('createCarForm');

    this.append(optionsInput);
    this.append(colorInput);
    this.append(submitInput);
    this.append(car);

    this.setAttribute('id', 'createCar');
    this.setAttribute('action', 'http://127.0.0.1:3000/garage');
    this.setAttribute('method', 'POST');

    this.carModelInput = optionsInput;
    this.colorInput = colorInput;
    this.car = car;

    this.addClass('create_car_form');
    this.car.addClass('test_color_car');

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
    });
  }

  private updatePreviewCarColor(): void {
    this.car.previewColor(this.color);
    this.carModelInput.setAttribute('style', `color: ${this.color}`);
  }
}
