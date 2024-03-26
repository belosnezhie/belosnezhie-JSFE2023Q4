import { Button } from './Button';
import { Car } from './Car';
import { BaseComponent } from './Component';

export class CarField extends BaseComponent {
  constructor(carModel: string) {
    const carControllersContainer = new BaseComponent({
      tag: 'div',
      className: 'car_controllers_container',
    });
    const raceControllersContainer = new BaseComponent({
      tag: 'div',
      className: 'rase_controllers_container',
    });

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

    carControllersContainer.append(selectButton);
    carControllersContainer.append(removeButton);
    carControllersContainer.append(carModelTitle);

    raceControllersContainer.append(startEngineButton);
    raceControllersContainer.append(stopEngineButton);

    super(
      { tag: 'div', className: 'car_field' },
      carControllersContainer,
      raceControllersContainer,
      new Car(),
    );
  }
}
