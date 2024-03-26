import { GarageCar } from './DataTypes';

// export async function getGarageCars(): Promise<GarageCar[]> {
//   const url = 'http://127.0.0.1:3000/garage';

//   const res = await fetch(url);
//   const data: GarageCar[] = <GarageCar[]>await res.json();

//   return data;
// }

// export async function getGarageCarsByPage(
//   page: number,
//   limit: number,
// ): Promise<GarageCar[]> {
//   const url = `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`;

//   const res = await fetch(url);
//   const carsCount: number = Number(res.headers.get('X-Total-Count'));
//   const data: GarageCar[] = <GarageCar[]>await res.json();

//   return data;
// }

class CarService {
  private maxCount: number = 0;
  private currentPage: number = 0;
  private limit = 7;

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

  hasMoreCars(): boolean {
    if ((this.currentPage + 1) * this.limit < this.maxCount) {
      return true;
    }

    return false;
  }
}

export const carService = new CarService();
