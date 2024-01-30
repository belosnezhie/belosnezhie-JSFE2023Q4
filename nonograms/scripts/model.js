import data from './data.json' assert { type: 'json' };

function randomNumber(min, max) {
  let randonInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randonInteger);
}

function getRandomMatrix() {
  let number = randomNumber(0, 14);
  return data.matrixes[number];
}

export const randomMatrixObj = getRandomMatrix();
