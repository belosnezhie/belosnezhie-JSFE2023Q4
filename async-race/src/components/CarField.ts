import { Button } from './Button';
import { Car } from './Car';
import { BaseComponent } from './Component';

export class CarField extends BaseComponent {
  constructor(carModel: string) {
    const selectButton = new Button('Select', 'select_button', () => {});
    const removeButton = new Button('Remove', 'remove_button', () => {});
    const carModelTitle = new BaseComponent({
      tag: 'p',
      className: 'car_model',
      text: carModel,
    });
    const startEngineButton = new Button(
      'Start',
      'start_engine_button',
      () => {},
    );
    const stopEngineButton = new Button('Stop', 'stop_engine_button', () => {});

    super(
      { tag: 'div', className: 'car_field' },
      selectButton,
      removeButton,
      carModelTitle,
      startEngineButton,
      stopEngineButton,
      new Car(),
    );
  }
}
