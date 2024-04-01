import { CreateCarData, GarageCar, TrafficParam, Winner } from './DataTypes';
import { currentCarEvent } from './EventEmitter';

class CarService {
  private maxCount: number = 0;
  private currentPage: number = 1;
  private limit = 7;
  private abortController: AbortController | undefined = undefined;
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    // const res = await fetch(url, {
    //   method: 'DELETE',
    // });

    // const result = res.ok;

    // if (result) {
    //   console.log(`${res.status}: ${res.ok}`);
    // } else {
    //   console.log(`${res.status}: ${res.statusText}`);
    // }
  }

  async startEngine(id: number): Promise<TrafficParam> {
    const url = `http://127.0.0.1:3000/engine?id=${id}&status=started`;

    const res = await fetch(url, {
      method: 'PATCH',
    });

    const data: TrafficParam = <TrafficParam>await res.json();

    return data;
  }

  async stopEngine(id: number): Promise<void> {
    const url = `http://127.0.0.1:3000/engine?id=${id}&status=stopped`;

    await fetch(url, {
      method: 'PATCH',
    });
  }

  async isEngineBroken(id: number, time: number): Promise<boolean> {
    const url = `http://127.0.0.1:3000/engine?id=${id}&status=drive`;

    this.abortController = new AbortController();

    try {
      const res = await fetch(url, {
        method: 'PATCH',
        signal: this.abortController.signal,
      });

      if (!res.ok && res.status === 500) {
        return true;
      }

      if (this.winner === undefined) {
        this.winner = id;

        const currentWinner: Winner = await this.getWinner(id);

        if (Object.keys(currentWinner).length === 0) {
          await this.createWinner(id, time);
        } else {
          await this.updateWinner(currentWinner, time);
        }

        currentCarEvent.emit('winnerWasDifined', id);
      }

      return false;
    } catch (error) {
      return true;
    }
  }

  async getWinner(id: number): Promise<Winner> {
    const url = `http://127.0.0.1:3000/winners?id=${id}`;

    const res = await fetch(url);

    const data: Winner[] = <Winner[]>await res.json();

    return data[0];
  }

  async createWinner(id: number, time: number) {
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

  async updateWinner(winner: Winner, currentTime: number) {
    const id = winner.id;
    const wins = winner.wins + 1;
    const prevTime = winner.time;

    let winTime = 0;

    if (prevTime >= currentTime) {
      winTime = currentTime;
    } else {
      winTime = prevTime;
    }

    const data = {
      wins: wins,
      time: winTime,
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

  abortRequest() {
    if (this.abortController instanceof AbortController) {
      this.abortController.abort();
    }
  }

  hasMoreCars(): boolean {
    if (this.currentPage < Math.ceil(this.maxCount / 7)) {
      return true;
    }

    return false;
  }

  hasLessCars(): boolean {
    if (this.currentPage === 1) {
      return false;
    }

    return true;
  }

  shareMaxCount(): number {
    return this.maxCount;
  }

  shareCurrentPage(): number {
    return this.currentPage;
  }

  startRace(): void {
    this.winner = undefined;
  }
}

export const carService = new CarService();
