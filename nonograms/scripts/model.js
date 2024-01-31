import data from './data.json' assert { type: 'json' };

function randomNumber(min, max) {
  let randonInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randonInteger);
}

function getRandomMatrix() {
  let number = randomNumber(0, 14);
  return data.matrices[number];
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

export const randomMatrixObj = data.matrices[0];
export const horisontalHints = formHorisontalHints();
export const verticalHints = formVerticalHints();
export const trueСellsArray = formTrueCellsArray();
