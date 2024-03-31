import { GarageCar, Winner } from '../services/DataTypes';

import { Car } from './Car';
import { BaseComponent } from './Component';

class Th extends BaseComponent {
  private onClick?: () => void;
  constructor(text: string, extraClass?: string, onClick?: () => void) {
    super({
      tag: 'th',
      className: 'th',
      text: text,
    });

    if (extraClass) {
      this.addClass(extraClass);
    }

    if (onClick) {
      this.onClick = onClick;
      this.addListener('click', this.onClick);
    }
  }
}

class WinnerCar extends BaseComponent {
  constructor(
    numder: number,
    carColor: string,
    carId: number,
    carModel: string,
    winCount: number,
    winTime: number,
  ) {
    const num = new BaseComponent({
      tag: 'td',
      className: 'td',
      text: numder.toString(),
    });

    const image = new BaseComponent(
      {
        tag: 'td',
        className: 'td',
      },
      new Car(carColor, carId),
    );

    const model = new BaseComponent({
      tag: 'td',
      className: 'td',
      text: carModel,
    });

    const count = new BaseComponent({
      tag: 'td',
      className: 'td',
      text: winCount.toString(),
    });

    const time = new BaseComponent({
      tag: 'td',
      className: 'td',
      text: (winTime / 1000).toFixed(3),
    });

    super(
      {
        tag: 'tr',
        className: 'table _row',
      },
      num,
      image,
      model,
      count,
      time,
    );
  }
}

export class Table extends BaseComponent {
  constructor(winners: Winner[], garageData: GarageCar[]) {
    const winNumber = new Th('#', 'th_number');
    const winCarImage = new Th('Car', 'th_image');
    const winCarName = new Th('Model', 'th_name');
    const winAmmount = new Th('Wins', 'th_wins', () => {});
    const winTime = new Th('Time', 'th_time', () => {});

    winAmmount.addClass('button');
    winTime.addClass('button');

    const tr = new BaseComponent(
      {
        tag: 'tr',
        className: 'tr',
      },
      winNumber,
      winCarImage,
      winCarName,
      winAmmount,
      winTime,
    );

    const tableHeaders = new BaseComponent(
      {
        tag: 'thead',
        className: 'thead',
      },
      tr,
    );

    const winnerFields = winners.map((winner, index) => {
      let color: string;

      if (garageData[index] !== undefined) {
        color = garageData[index].color;
      } else {
        color = '';
      }

      let model: string;

      if (garageData[index] !== undefined) {
        model = garageData[index].name;
      } else {
        model = '';
      }

      return new WinnerCar(
        index + 1,
        color,
        winner.id,
        model,
        winner.wins,
        winner.time,
      );
    });

    super(
      {
        tag: 'table',
        className: 'table',
      },
      tableHeaders,
      ...winnerFields,
    );
  }
}
