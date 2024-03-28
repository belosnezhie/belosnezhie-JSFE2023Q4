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
  private currentPage: number = 1;
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

  async getPrevCars(): Promise<GarageCar[]> {
    this.currentPage -= 1;

    return this.getGarageCarsByPage(this.currentPage, this.limit);
  }

  async removeCar(carId: number) {
    const url = `http://127.0.0.1:3000/garage/${carId}`;

    // try {
    //   const res = await fetch(url, {
    //     method: 'DELETE',
    //   });

    //   const result = res.ok;

    //   if (result) {
    //     console.log(`${res.status}: ${res.ok}`);
    //   } else {
    //     console.log(`${res.status}: ${res.statusText}`);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   throw new Error(err);
    // }
    const res = await fetch(url, {
      method: 'DELETE',
    });

    const result = res.ok;

    if (result) {
      console.log(`${res.status}: ${res.ok}`);
    } else {
      console.log(`${res.status}: ${res.statusText}`);
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
}

export const carService = new CarService();
