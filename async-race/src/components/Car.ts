import { TrafficParam } from '../services/DataTypes';

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

  public drive(driveParam: TrafficParam, parentWidth: number) {
    const element = this.getElement();
    const duration = driveParam.distance / driveParam.velocity;

    let start: number;
    let previousTimeStamp: number;
    let done = false;
    const distance = parentWidth - 80 - 10;
    const velocity = parentWidth / duration;

    function step(timeStamp: number) {
      if (start === undefined) {
        start = timeStamp;
      }
      const elapsed = timeStamp - start;

      if (previousTimeStamp !== timeStamp) {
        const count = Math.min(velocity * elapsed, distance);

        element.style.transform = `translateX(${count}px)`;
        if (count === distance) done = true;
      }

      if (elapsed < duration) {
        previousTimeStamp = timeStamp;
        if (!done) {
          window.requestAnimationFrame(step);
        }
      }
    }

    window.requestAnimationFrame(step);
  }
}
