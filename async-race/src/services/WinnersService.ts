import { Winner } from './DataTypes';

class WinnersService {
  private maxCount: number = 0;
  private currentPage: number = 1;
  private limit = 10;

  async getWinners(): Promise<Winner[]> {
    return this.getWinnersByPage(this.currentPage, this.limit);
  }

  async getWinnersByPage(page: number, limit: number): Promise<Winner[]> {
    const url = `http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}`;

    const res = await fetch(url);

    this.maxCount = Number(res.headers.get('X-Total-Count'));
    const data: Winner[] = <Winner[]>await res.json();

    return data;
  }

  async getNextWinners(): Promise<Winner[]> {
    this.currentPage += 1;

    return this.getWinnersByPage(this.currentPage, this.limit);
  }

  async getPrevWinners(): Promise<Winner[]> {
    this.currentPage -= 1;

    return this.getWinnersByPage(this.currentPage, this.limit);
  }

  hasMoreCars(): boolean {
    if (this.currentPage < Math.ceil(this.maxCount / 10)) {
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

export const winnersService = new WinnersService();
