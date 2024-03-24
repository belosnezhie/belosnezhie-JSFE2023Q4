import { GarageCar } from './DataTypes';

export async function getGarageCars(): Promise<GarageCar[]> {
  const url = 'http://127.0.0.1:3000/garage';

  const res = await fetch(url);
  const data: GarageCar[] = <GarageCar[]>await res.json();

  return data;
}
