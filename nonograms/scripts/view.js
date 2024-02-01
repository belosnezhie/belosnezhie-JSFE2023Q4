let viewTime = undefined;
let seconds = 1;
let isPaused = true;
let currentTime = 0;

let viewVerticalClues = undefined;
let viewHorisontalClues = undefined;
let viewGame = undefined;
let viewShadowWrapper = undefined;

export function render() {
  document.body.classList.add('app');
  const appWrapper = renderElement('div', 'app-wrapper', document.body);
  const title = renderElement('h1', 'title', appWrapper);
  title.innerText = 'Nonograms';

  const soundsContainer = renderElement('div', 'sounds-container', appWrapper);

  const soundlabel = renderElement('label', '', soundsContainer);
  soundlabel.setAttribute('for', 'soundsInput');
  soundlabel.textContent = 'Turn sounds off';
  const soundsInput = renderElement(
    'input',
    'button',
    soundsContainer,
    'sound',
  );
  soundsInput.setAttribute('type', 'checkbox');
  soundsInput.setAttribute('id', 'soundsInput');
  soundsInput.setAttribute('checked', '');
  soundsInput.addEventListener('change', checkSounds);

  const gameWrapper = renderElement('div', 'game-wprapper', appWrapper);
  const buttonsContainer = renderElement(
    'div',
    'buttons-container',
    gameWrapper,
  );

  const resetButton = renderButton(buttonsContainer, 'reset');
  resetButton.innerText = 'Reset game';
  resetButton.addEventListener('click', () => {
    isPaused = false;
    enableGame();
    clearGameFromCrosses();
    clearGameFromDarkCells();
    chosenTrueCells = [];
    chosenFalseCells = [];
  });

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
  time.textContent = '00:00';
  viewTime = time;
  setInterval(countTime, 1000);

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
  game.addEventListener('contextmenu', makeCeilCrossed);

  createHorisontalHints(horisontalClues);
  createVerticalHints(verticalClues);
  createGame(game);

  const solutionButton = renderButton(gameField, 'solution');
  solutionButton.innerText = 'Solution';
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

//Рендер модалки
function renderModal() {
  isPaused = true;
  const shadowWrapper = renderElement('div', 'shadow-wrapper', document.body);
  shadowWrapper.setAttribute('id', 'shadow-wrapper');
  viewShadowWrapper = shadowWrapper;
  const modalWindow = renderElement('div', 'modal-window', shadowWrapper);
  modalWindow.addEventListener('click', (event) => {
    event._isClickWithInMenu = true;
  });
  const closeModalButton = renderButton(modalWindow, 'close-modal');
  closeModalButton.addEventListener('click', closeModal);
  const modalGreetings = renderElement('h2', 'result-message', modalWindow);
  modalGreetings.innerText = 'Great!';
  const modalText = renderElement('h2', 'result-message', modalWindow);
  const winTime = localStorage.getItem('time');
  modalText.textContent = `You have solved the nonogram in ${winTime} seconds!`;
}

function closeModal(event) {
  clearGameFromCrosses();
  document.body.removeChild(viewShadowWrapper);
  viewShadowWrapper = undefined;
  event._isClickWithInMenu = true;
}

document.body.addEventListener('click', (event) => {
  if (viewShadowWrapper === undefined) {
    return;
  }
  if (event._isClickWithInGame === true) {
    return;
  }
  if (event._isClickWithInMenu === true) {
    return;
  } else {
    clearGameFromCrosses();
    document.body.removeChild(viewShadowWrapper);
    viewShadowWrapper = undefined;
  }
});

// Функция таймера
function countTime() {
  if (isPaused) {
    return;
  }

  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainSeconds).padStart(2, '0')}`;
  currentTime = formattedTime;

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

let chosenTrueCells = [];
let chosenFalseCells = [];

function checkAndRerenderMatrix(event) {
  isPaused = false;
  event._isClickWithInGame = true;
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

// Импорт звуков
import { darkSound } from './model.js';
import { crossSound } from './model.js';
import { clearSound } from './model.js';
import { winSound } from './model.js';
// import { soundsArr } from './model.js';

function makeCeilDark(event) {
  if (viewGame.classList.contains('disabled')) {
    return;
  }
  if (!event.target.classList.contains('dark')) {
    console.log(darkSound);
    darkSound.play();
    event.target.classList.add('dark');
  } else {
    clearSound.play();
    event.target.classList.remove('dark');
  }
}

function makeCeilCrossed(event) {
  event.preventDefault();
  if (viewGame.classList.contains('disabled')) {
    return;
  }
  if (!event.target.classList.contains('crossed')) {
    crossSound.play();
    event.target.classList.add('crossed');
  } else {
    clearSound.play();
    event.target.classList.remove('crossed');
  }
}

function checkMatrix() {
  if (trueСellsArray.length === chosenTrueCells.length) {
    if (chosenFalseCells.length === 0) {
      console.log('You win!');
      disableGame();
      winSound.play();
      renderModal();
      localStorage.setItem('time', currentTime);
    }
  }
}

function disableGame() {
  if (!viewGame.classList.contains('disabled')) {
    viewGame.classList.add('disabled');
  }
}

function enableGame() {
  if (viewGame.classList.contains('disabled')) {
    viewGame.classList.remove('disabled');
  }
}

function clearGameFromCrosses() {
  viewGame.childNodes.forEach((firstChild) => {
    firstChild.childNodes.forEach((item) => {
      item.classList.remove('crossed');
    });
  });
}

function clearGameFromDarkCells() {
  viewGame.childNodes.forEach((firstChild) => {
    firstChild.childNodes.forEach((item) => {
      item.classList.remove('dark');
    });
  });
}

function checkSounds(event) {
  if (event.target.checked) {
    darkSound.muted = true;
    crossSound.muted = true;
    clearSound.muted = true;
    winSound.muted = true;
  } else {
    darkSound.muted = false;
    crossSound.muted = false;
    clearSound.muted = false;
    winSound.muted = false;
  }
  console.log(darkSound);
}
