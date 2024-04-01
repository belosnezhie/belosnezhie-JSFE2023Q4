import carModels from '../data/Cars.json';

import { CreateCarData } from './DataTypes';

function getRandomDigit(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getHEXColor(): string {
  let color = '';

  const digit = Math.floor(Math.random() * 0xffffff);

  color = digit.toString(16);

  return `#${color.padEnd(6, '0')}`;
}

function getCarModelPare() {
  const typesCount: number = carModels.length;

  const typeIndex = getRandomDigit(0, typesCount);

  const modelsCount: number = carModels[typeIndex].models.length;

  const modelIndex = getRandomDigit(0, modelsCount);

  const type = carModels[typeIndex].name;
  const model = carModels[typeIndex].models[modelIndex];

  return `${type} ${model}`;
}

export function createRandomCarData(): CreateCarData {
  const color = getHEXColor();
  const model = getCarModelPare();

  const data: CreateCarData = {
    name: model,
    color: color,
  };

  return data;
}
