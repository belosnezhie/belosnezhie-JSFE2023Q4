import data from './data.json' assert { type: 'json' };

export let randomMatrixObj = undefined;
export let horisontalHints = undefined;
export let verticalHints = undefined;
export let trueСellsArray = undefined;

// При загрузке
export function generateDefault() {
  randomMatrixObj = data[level][0];
  horisontalHints = formHorisontalHints();
  verticalHints = formVerticalHints();
  trueСellsArray = formTrueCellsArray();
}

export let level = undefined;

function randomNumber(min, max) {
  let randonInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randonInteger);
}

function getRandomMatrix() {
  let number = randomNumber(0, 5);
  return data[level][number];
}

function formVerticalHints() {
  const matrix = randomMatrixObj.matrix;

  const verticalHints = [];

  for (let i = 0; i < matrix.length; i += 1) {
    const currentHits = [];
    let wasFilled = false;
    let counter = 0;
    for (let j = 0; j < matrix.length; j += 1) {
      if (matrix[i][j] === 1) {
        counter += 1;
        wasFilled = true;
      } else {
        if (wasFilled) {
          currentHits.push(counter);
          counter = 0;
          wasFilled = false;
        }
      }
      if (j === matrix.length - 1) {
        if (counter !== 0) {
          currentHits.push(counter);
        }
        if (currentHits.length === 0) {
          currentHits.push(counter);
        }
        counter = 0;
        wasFilled = false;
      }
    }
    verticalHints.push(currentHits);
  }
  return verticalHints;
}

function formHorisontalHints() {
  const matrix = randomMatrixObj.matrix;

  const horisontalHints = [];

  for (let i = 0; i < matrix.length; i += 1) {
    const currentHits = [];
    let wasFilled = false;
    let counter = 0;
    for (let j = 0; j < matrix.length; j += 1) {
      if (matrix[j][i] === 1) {
        counter += 1;
        wasFilled = true;
      } else {
        if (wasFilled) {
          currentHits.push(counter);
          counter = 0;
          wasFilled = false;
        }
      }
      if (j === matrix.length - 1) {
        if (counter !== 0) {
          currentHits.push(counter);
        }
        if (currentHits.length === 0) {
          currentHits.push(counter);
        }
        counter = 0;
        wasFilled = false;
      }
    }
    horisontalHints.push(currentHits);
  }
  return horisontalHints;
}

function formTrueCellsArray() {
  const matrix = randomMatrixObj.matrix;

  let trueСellsArray = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 1) {
        trueСellsArray.push(matrix[i][j]);
      }
    }
  }
  return trueСellsArray;
}

// export const randomMatrixObj = data[level][0];
// export const horisontalHints = formHorisontalHints();
// export const verticalHints = formVerticalHints();
// export const trueСellsArray = formTrueCellsArray();

export function setLevel(myLevel) {
  level = myLevel;
}

// Sounds
export const soundsArr = [];

export const darkSound = new Audio();
darkSound.preload = 'auto';
darkSound.src = './assets/sounds/Darking.wav';
darkSound.setAttribute('muted', 'false');
soundsArr.push(darkSound);

export const crossSound = new Audio();
crossSound.preload = 'auto';
crossSound.src = './assets/sounds/Cross.wav';
darkSound.setAttribute('muted', 'false');
soundsArr.push(crossSound);

export const clearSound = new Audio();
clearSound.preload = 'auto';
clearSound.src = './assets/sounds/Clear.wav';
darkSound.setAttribute('muted', 'false');
soundsArr.push(clearSound);

export const winSound = new Audio();
winSound.preload = 'auto';
winSound.src = './assets/sounds/Win.wav';
darkSound.setAttribute('muted', 'false');
soundsArr.push(winSound);

// Объект для генерации селекторов
function createLevelsArr() {
  const levelsArr = [];
  const level = {};

  data.matrices.forEach((item) => {});
}
