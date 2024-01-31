let viewTime = undefined;
let seconds = 0;

let viewVerticalClues = undefined;
let viewHorisontalClues = undefined;
let viewGame = undefined;

export function render() {
  document.body.classList.add('app');
  const appWrapper = renderElement('div', 'app-wrapper', document.body);
  const title = renderElement('h1', 'title', appWrapper);
  title.innerText = 'Nonograms';

  const gameWrapper = renderElement('div', 'game-wprapper', appWrapper);
  const buttonsContainer = renderElement(
    'div',
    'buttons-container',
    gameWrapper,
  );

  const resetButton = renderButton(buttonsContainer, 'reset');
  resetButton.innerText = 'Reset game';
  const saveButton = renderButton(buttonsContainer, 'save');
  saveButton.innerText = 'Save game';
  const continueButton = renderButton(buttonsContainer, 'continue');
  continueButton.innerText = 'Continue last game';
  const randomButton = renderButton(buttonsContainer, 'random');
  randomButton.innerText = 'Random game';

  const gameFieldContainer = renderElement(
    'div',
    'game-field-container',
    gameWrapper,
  );

  const levelControlsConteiner = renderElement(
    'div',
    'level-controls-conteiner',
    gameFieldContainer,
  );

  const levelControlsTitle = renderElement('h2', '', levelControlsConteiner);
  levelControlsTitle.innerText = 'Choose complexity and image';

  // Блок с выбором сложности
  ['Easy', 'Medium', 'Hard'].forEach((item) => {
    const wrapper = renderElement('div', '', levelControlsConteiner);
    const title = renderElement('h3', '', wrapper);
    title.innerText = item;
    const select = renderElement('select', 'level', levelControlsConteiner);
    const option = renderElement('option', '', select);
    option.innerText = item;
    option.setAttribute('disabled', '');
    ['image', 'image', 'image', 'image', 'image'].forEach((i) => {
      const optionImage = renderElement('option', '', select);
      optionImage.innerText = i;
    });
  });

  // Timer
  const gameField = renderElement('div', 'game-field', gameFieldContainer);
  const counterContainer = renderElement('div', 'counter-container', gameField);
  const time = renderElement('span', 'time', counterContainer);
  viewTime = time;
  countTime, 1000;

  //Game field
  const field = renderElement('div', 'field', gameField);
  const verticalClues = renderElement('div', 'vertical-clues-container', field);
  viewVerticalClues = verticalClues;
  const horisontalClues = renderElement(
    'div',
    'horisontal-clues-container',
    field,
  );
  viewHorisontalClues = horisontalClues;
  const game = renderElement('div', 'game', field);
  viewGame = game;
  game.addEventListener('click', checkAndRerenderMatrix);

  createHorisontalHints(horisontalClues);
  createVerticalHints(verticalClues);
  createGame(game);
}

// Рендер игрового поля

import { randomMatrixObj } from './model.js';
import { horisontalHints } from './model.js';
import { verticalHints } from './model.js';

function createGame(parent) {
  const matrix = randomMatrixObj.matrix;
  for (let i = 0; i < matrix.length; i += 1) {
    const row = renderElement('div', 'row', parent);
    for (let j = 0; j < matrix[i].length; j += 1) {
      const ceil = renderElement('div', 'ceil', row);
      ceil.innerText = matrix[i][j];
      ceil.setAttribute('data-value', matrix[i][j]);
      // ceil.addEventListener('click', checkAndRerenderMatrix);
    }
  }
}

function createHorisontalHints(parent) {
  horisontalHints.forEach((arr) => {
    const clueColumn = renderElement('div', 'clue-column', parent);
    arr.forEach((digit) => {
      const clue = renderElement('span', 'clue', clueColumn);
      clue.innerText = digit;
    });
  });
}

function createVerticalHints(parent) {
  verticalHints.forEach((arr) => {
    const clueRow = renderElement('div', 'clue-row', parent);
    arr.forEach((digit) => {
      const clue = renderElement('span', 'clue', clueRow);
      clue.innerText = digit;
    });
  });
}

// Рендер кнопок
function renderButton(parent, type) {
  return renderElement('button', 'button', parent, type);
}

// Функция таймера
function countTime() {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainSeconds).padStart(2, '0')}`;

  viewTime.textContent = formattedTime;

  seconds++;
}

// Общая функция создания элемента
function renderElement(elTag, elClass, elParent, addElClass) {
  const el = document.createElement(elTag);
  if (elClass) {
    el.classList.add(elClass);
  }
  elParent.append(el);
  if (addElClass) {
    el.classList.add(addElClass);
  }
  return el;
}

//// ЛОГИКА КЛИКОВ ПО ЯЧЕЙКАМ
// function setCheckAndRerenderMatrix(innerFunction) {
//   checkAndRerenderMatrix = innerFunction;
// }

import { trueСellsArray } from './model.js';

const chosenTrueCells = [];
const chosenFalseCells = [];

function checkAndRerenderMatrix(event) {
  makeCeilDark(event);
  const ceil = event.target;
  if (event.target.classList.contains('dark')) {
    if (ceil.dataset.value === '1') {
      chosenTrueCells.push(ceil.dataset.value);
    } else {
      chosenFalseCells.push(ceil.dataset.value);
    }
  } else {
    if (ceil.dataset.value === '1') {
      chosenTrueCells.pop(ceil.dataset.value);
    } else {
      chosenFalseCells.pop(ceil.dataset.value);
    }
  }
  console.log(`chosenTrueCeils: ${chosenTrueCells}`);
  console.log(`chosenFalseCeils: ${chosenFalseCells}`);
  checkMatrix();
}

function makeCeilDark(event) {
  if (!event.target.classList.contains('dark')) {
    event.target.classList.add('dark');
  } else {
    event.target.classList.remove('dark');
  }
}

function checkMatrix() {
  if (trueСellsArray.length === chosenTrueCells.length) {
    if (chosenFalseCells.length === 0) {
      console.log('You win!');
    }
  }
}
