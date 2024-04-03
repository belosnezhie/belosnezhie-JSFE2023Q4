import { GarageCar } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { Car } from './Car';
import { Form } from './Form';
import { Input } from './Input';

export class UpdateCarForm extends Form {
  private carID: number | undefined = undefined;
  private carModelInput: Input;
  private colorInput: Input;
  private car: Car;
  private color: string = '#505d5f99';

  constructor() {
    const colorInput = new Input(
      'color',
      'colorInput',
      'color_input',
      '#505d5f',
      (event: Event) => {
        const target: HTMLInputElement = <HTMLInputElement>event.target;
        const colorValue: string = target.value;

        this.color = colorValue;
        this.updatePreviewCarColor();
      },
    );

    const submitInput = new Input(
      'submit',
      'updateCar',
      'submit-input',
      'Update car',
    );

    const carModelInput = new Input(
      'text',
      'update_car_input',
      'update_car_input',
    );

    const car = new Car('#505d5f99', 0);

    super('updateCarForm');

    this.append(carModelInput);
    this.append(colorInput);
    this.append(submitInput);
    this.append(car);

    this.carModelInput = carModelInput;
    this.colorInput = colorInput;
    this.car = car;

    this.addClass('update_car_form');
    this.addClass('disabled');
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

  private updatePreviewCarColor(): void {
    this.car.previewColor(this.color);
    this.carModelInput.setAttribute('style', `color: ${this.color}`);
  }
}
