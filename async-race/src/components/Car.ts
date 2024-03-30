import { TrafficParam } from '../services/DataTypes';
import { currentCarEvent } from '../services/EventEmitter';

import { BaseComponent } from './Component';

export class Car extends BaseComponent {
  private carId: number;
  private cancelAnimationID: number = 0;

  constructor(carColor: string, carId: number) {
    const sprite = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );

    sprite.classList.add('car_svg');
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

    this.carId = carId;
  }

  public drive(driveParam: TrafficParam, parentWidth: number) {
    const duration = driveParam.distance / driveParam.velocity;

    let start: number;
    let previousTimeStamp: number;
    const done = false;
    const distance = parentWidth - 80 - 10;
    const velocity = parentWidth / duration;

    this.cancelAnimationID = window.requestAnimationFrame((timeStamp: number) =>
      this.animate(
        timeStamp,
        start,
        previousTimeStamp,
        velocity,
        distance,
        duration,
        done,
      ),
    );

    currentCarEvent.emit('carIsDriving', this.carId);
  }

  public broke() {
    window.cancelAnimationFrame(this.cancelAnimationID);
    console.log('Car is broken!');
  }

  public stop() {
    window.cancelAnimationFrame(this.cancelAnimationID);
    this.getElement().style.transform = 'translateX(0px)';
    console.log('Car was stopped!');
  }

  private animate(
    timeStamp: number,
    start: number,
    previousTimeStamp: number,
    velocity: number,
    distance: number,
    duration: number,
    done: boolean,
  ) {
    if (start === undefined) {
      start = timeStamp;
    }
    const elapsed = timeStamp - start;

    if (previousTimeStamp !== timeStamp) {
      const count = Math.min(velocity * elapsed, distance);

      this.getElement().style.transform = `translateX(${count}px)`;
      if (count === distance) done = true;
    }

    if (elapsed < duration) {
      previousTimeStamp = timeStamp;
      if (!done) {
        this.cancelAnimationID = window.requestAnimationFrame(
          (timestamp: number) =>
            this.animate(
              timestamp,
              start,
              previousTimeStamp,
              velocity,
              distance,
              duration,
              done,
            ),
        );
      }
    }
  }
}
