import { CreateCarData, GarageCar, TrafficParam, Winner } from './DataTypes';
import { currentCarEvent } from './EventEmitter';

class CarService {
  private maxCount: number = 0;
  private currentPage: number = 1;
  private limit = 7;
  private abortController: AbortController | undefined = undefined;
  private abortControllers: Map<number, AbortController> = new Map();
  private winner: number | undefined = 0;

  async getGarageCars(): Promise<GarageCar[]> {
    return this.getGarageCarsByPage(this.currentPage, 7);
  }

  async getGarageCarsByPage(page: number, limit: number): Promise<GarageCar[]> {
    const url = `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`;

    const res = await fetch(url);

    this.maxCount = Number(res.headers.get('X-Total-Count'));
    const data: GarageCar[] = <GarageCar[]>await res.json();

    return data;
  }

  async getNextCars(): Promise<GarageCar[]> {
    this.currentPage += 1;

    return this.getGarageCarsByPage(this.currentPage, this.limit);
  }

  async getPrevCars(): Promise<GarageCar[]> {
    this.currentPage -= 1;

    return this.getGarageCarsByPage(this.currentPage, this.limit);
  }

  async getCar(carId: number): Promise<GarageCar> {
    const url = `http://127.0.0.1:3000/garage?id=${carId}`;

    const res = await fetch(url);

    const cars: GarageCar[] = <GarageCar[]>await res.json();

    return cars[0];
  }

  async createCar(carData: CreateCarData) {
    try {
      await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(carData),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeCar(carId: number) {
    const url = `http://127.0.0.1:3000/garage/${carId}`;

    try {
      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (!res.ok && res.status === 404) {
        console.log(`${res.status}: ${res.statusText}`);
      }

      try {
        await this.getWinner(carId);

        await this.removeWinner(carId);
      } catch (error) {}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  public async startEngine(id: number): Promise<TrafficParam> {
    const url = `http://127.0.0.1:3000/engine?id=${id}&status=started`;

    const res = await fetch(url, {
      method: 'PATCH',
    });

    const data: TrafficParam = <TrafficParam>await res.json();

    return data;
  }

  public async stopEngine(id: number): Promise<void> {
    const url = `http://127.0.0.1:3000/engine?id=${id}&status=stopped`;

    await fetch(url, {
      method: 'PATCH',
    });
  }

  public async isEngineBroken(id: number, time: number): Promise<boolean> {
    const url = `http://127.0.0.1:3000/engine?id=${id}&status=drive`;

    const abortController = new AbortController();

    this.abortControllers.set(id, abortController);

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        signal: abortController.signal,
      });

      if (!res.ok && res.status === 500) {
        console.log(`${id} car was suddenly broken!`);

        return true;
      }

      if (res && res.status === 200) {
        if (this.winner === undefined) {
          this.winner = id;

          try {
            const currentWinner: Winner = await this.getWinner(id);

            await this.updateWinner(currentWinner, time);
          } catch (error) {
            await this.createWinner(id, time);
          }

          currentCarEvent.emitWithTime('winnerWasDifined', id, time);
        }
      }

      return false;
    } catch (error) {
      return true;
    }
  }

  public async getWinner(id: number): Promise<Winner> {
    const url = `http://127.0.0.1:3000/winners?id=${id}`;

    const res = await fetch(url);

    const data: Winner[] = <Winner[]>await res.json();

    if (data.length === 0) {
      throw new Error('There is no such winner');
    }

    return data[0];
  }

  public async createWinner(id: number, time: number) {
    const data = {
      id: id,
      wins: 1,
      time: time,
    };

    const res = await fetch('http://127.0.0.1:3000/winners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok && res.status === 201) {
      console.log('Winner was created');
    }
  }

  async removeWinner(carId: number) {
    const url = `http://127.0.0.1:3000/winners/${carId}`;

    try {
      const res = await fetch(url, {
        method: 'DELETE',
      });

      if (!res.ok && res.status === 404) {
        console.log(`${res.status}: ${res.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  public async updateWinner(winner: Winner, currentTime: number) {
    const id = winner.id;
    const wins = winner.wins + 1;
    const prevTime = winner.time;

    let bestTime = 0;

    if (prevTime >= currentTime) {
      bestTime = currentTime;
    } else {
      bestTime = prevTime;
    }

    const data = {
      wins: wins,
      time: bestTime,
    };

    const res = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok && res.status === 200) {
      console.log('Winner was updated');
    }
  }

  public abortRequest(carIndex: number) {
    this.abortControllers.get(carIndex)?.abort();
    this.abortControllers.delete(carIndex);
  }

  public hasMoreCars(): boolean {
    if (this.currentPage < Math.ceil(this.maxCount / 7)) {
      return true;
    }

    return false;
  }

  public hasLessCars(): boolean {
    if (this.currentPage === 1) {
      return false;
    }

    return true;
  }

  public shareMaxCount(): number {
    return this.maxCount;
  }

  public shareCurrentPage(): number {
    return this.currentPage;
  }

  public startRace(): void {
    this.winner = undefined;
  }
}

export const carService = new CarService();
