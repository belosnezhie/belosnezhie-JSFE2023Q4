import { CarType, GarageCar } from '../services/DataTypes';

import { BaseComponent } from './Component';

export class Input extends BaseComponent {
  constructor(
    type: string,
    id: string,
    exstraClass: string,
    text?: string,
    options?: GarageCar[] | CarType[],
    listId?: string,
  ) {
    if (options && listId) {
      const dataListOptions: BaseComponent[] = options.map((option) => {
        const optionElement = new BaseComponent({
          tag: 'option',
          className: `${listId}_option`,
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
    }

    super({
      tag: 'input',
      className: 'input',
      text: text,
    });
    this.setAttribute('type', type);
    this.setAttribute('id', id);
    this.addClass(exstraClass);

    if (listId) {
      this.setAttribute('list', listId);
    }
  }
}
