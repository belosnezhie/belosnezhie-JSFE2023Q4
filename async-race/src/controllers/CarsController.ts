import { CreateCarData, GarageCar, TrafficParam } from '../data/DataTypes';
import { GaragePage } from '../pages/GaragePage';
import { createRandomCarData } from '../services/CarGeneratorService';
import { carService } from '../services/CarService';
import { currentCarEvent } from '../services/EventEmitter';

export class CarsController {
  private root: HTMLElement;
  private garagePage: GaragePage | undefined;

  constructor(root: HTMLElement) {
    this.root = root;
    this.garagePage = undefined;

    currentCarEvent.subscribeAsync('carWasCreated', async () => {
      await this.reRenderGaragePage();
    });

    currentCarEvent.subscribeAsync('carWasUpdated', async () => {
      await this.reRenderGaragePage();

      currentCarEvent.emit('winnerWasUpdated');
    });

    currentCarEvent.subscribeAsync('carWasRemoved', async (carIndex) => {
      if (typeof carIndex === 'number') {
        await carService.removeCar(carIndex);
      }

      await this.reRenderGaragePage();

      currentCarEvent.emit('winnerWasRemoved');
    });

    currentCarEvent.subscribeAsync('carWasStarted', async (carIndex) => {
      if (typeof carIndex !== 'number') {
        throw new Error('Index is not defind');
      }
      if (!this.garagePage) {
        throw new Error('GaragePage is not defind');
      }

      const driveParam: TrafficParam = await carService.startEngine(carIndex);
      const time: number = driveParam.distance / driveParam.velocity / 1000;

      this.garagePage.driveCar(driveParam, carIndex);

      const isBroken = await carService.isEngineBroken(carIndex, time);

      if (isBroken) {
        this.garagePage.brokeCar(carIndex);
      }
    });

    currentCarEvent.subscribeAsync('carWasStopped', async (carIndex) => {
      if (typeof carIndex !== 'number') {
        throw new Error('Index is not defind');
      }
      carService.abortRequest(carIndex);
      await carService.stopEngine(carIndex);
    });

    currentCarEvent.subscribe('startRace', () => {
      return carService.startRace();
    });

    currentCarEvent.subscribeAsyncWithTime(
      'winnerWasDifined',
      async (carId, time) => {
        if (typeof carId !== 'number') {
          throw new Error('Index is not defind');
        }
        if (!this.garagePage) {
          throw new Error('GaragePage is not defind');
        }

        const car: GarageCar = await carService.getCar(carId);
        const model: string = car.name;

        this.garagePage.showWinner(model, time);
      },
    );

    currentCarEvent.subscribe('carWasSelected', async (carId) => {
      if (typeof carId !== 'number') {
        throw new Error('Index is not defind');
      }
      if (!this.garagePage) {
        throw new Error('GaragePage is not defind');
      }

      const car = await carService.getCar(carId);

      this.garagePage.updateCar(car);
    });

    currentCarEvent.subscribeAsync('generateCars', async () => {
      let counter: number = 100;

      while (counter > 0) {
        const carData: CreateCarData = createRandomCarData();

        await carService.createCar(carData);

        counter -= 1;
      }

      await this.reRenderGaragePage();
    });
  }

  public async renderPage(): Promise<GaragePage> {
    const cars = await carService.getGarageCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();
    const carsCount: number = carService.shareMaxCount();
    const page: number = carService.shareCurrentPage();

    this.garagePage = new GaragePage(
      cars,
      hasMoreCars,
      hasLessCars,
      page,
      carsCount,
    );

    this.root.append(this.garagePage.getElement());

    return this.garagePage;
  }

  public async loadNextCars(): Promise<void> {
    const cars = await carService.getNextCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();
    const page: number = carService.shareCurrentPage();

    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRender(cars, hasMoreCars, hasLessCars, page);
    }
  }

  public async loadPrevCars(): Promise<void> {
    const cars = await carService.getPrevCars();
    const hasMoreCars: boolean = carService.hasMoreCars();
    const hasLessCars: boolean = carService.hasLessCars();
    const page: number = carService.shareCurrentPage();

    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRender(cars, hasMoreCars, hasLessCars, page);
    }
  }

  public removePage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.removeElement();
    }
  }

  public reRender() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.reRenderComponent();
    }
  }

  public hidePage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.setAttribute('style', 'display: none');
    }
  }

  public showPage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.setAttribute('style', 'display: flex');
    }
  }

  private async reRenderGaragePage() {
    if (this.garagePage instanceof GaragePage) {
      this.garagePage.removeElement();
    }
    await this.renderPage();
  }
}

export const carsController = new CarsController(document.body);
