import { GarageCar } from '../data/DataTypes';

import { BaseComponent } from './Component';
import { Input } from './Input';

// Этот инпут должен уметь отдавать звое значение форме
// Можно попробовать написать у него отдельный метод, который будет это делать
// Или можно этому научить основной инпут

export class UpdateCarModelInput extends Input {
  constructor(options: GarageCar[], listId: string) {
    const dataListOptions: BaseComponent[] = options.map((option) => {
      const optionElement = new BaseComponent({
        tag: 'option',
        className: `${listId}_option`,
        text: option.name,
      });

      optionElement.setAttribute('value', option.name);

      return optionElement;
    });

    const datalist = new BaseComponent(
      {
        tag: 'datalist',
        className: 'datalist',
      },
      ...dataListOptions,
    );

    datalist.addClass(listId);
    datalist.setAttribute('id', listId);

    super('', 'updateCarModel', 'update_car_input');
    this.setAttribute('list', listId);
    this.append(datalist);
  }
}
