import { BaseComponent } from './Component';

export class Car extends BaseComponent {
  constructor(carColor: string, carId: number) {
    const sprite = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );

    sprite.classList.add('car_svg');
    sprite.setAttribute('width', '80');
    sprite.setAttribute('height', '40');
    sprite.setAttribute('fill', carColor);
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    use.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      'car.svg#Car',
    );
    sprite.append(use);

    super({ tag: 'div', className: 'car' });
    this.setAttribute('data_id', `${carId}`);
    const carElement = this.getElement();

    carElement.append(sprite);
  }
}
