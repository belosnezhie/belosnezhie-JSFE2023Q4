import * as model from './model.js';
import { randomMatrixObj } from './model.js';
import { horisontalHints } from './model.js';
import { verticalHints } from './model.js';
import { trueСellsArray } from './model.js';
import { findLevels, findImageNames } from './model.js';

let viewTime = undefined;
let seconds = 1;
let isPaused = true;
let currentTime = 0;

let viewVerticalClues = undefined;
let viewHorisontalClues = undefined;
let viewGame = undefined;
let viewShadowWrapper = undefined;

// Переменные игрового поля
let viewField = undefined;

// Переменные селекторов
let viewLevel = undefined;
let viewImageIndex = undefined;
let viewLevelSelector = undefined;
let viewImageSelector = undefined;

export function renderApp() {
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
  saveButton.addEventListener('click', saveGame);

  const continueButton = renderButton(buttonsContainer, 'continue');
  continueButton.innerText = 'Continue last game';
  continueButton.addEventListener('click', () => {
    continueGame();
  });

  const randomButton = renderButton(buttonsContainer, 'random');
  randomButton.innerText = 'Random game';
  randomButton.addEventListener('click', () => {
    model.getRandomMatrix();
    renderGameField();
    viewLevel = model.level;
    viewImageIndex = model.imageIndex;
    renderSelectors(viewLevel, viewImageIndex);
  });

  const scoresButton = renderButton(buttonsContainer, 'scores');
  scoresButton.innerText = 'Scores';
  scoresButton.addEventListener('click', (event) => {
    event._isClickWithInGame = true;
    renderModal(event);
  });

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

  const levelsArr = findLevels();

  // Level selector
  const selectLevel = renderElement('select', 'level', levelControlsConteiner);
  levelsArr.forEach((level) => {
    const option = renderElement('option', '', selectLevel);
    option.textContent = level;
  });
  viewLevelSelector = selectLevel;
  viewLevel = selectLevel.value;
  localStorage.setItem('level', viewLevel);
  selectLevel.addEventListener('change', (event) => {
    viewLevel = selectLevel.value;
    localStorage.setItem('level', viewLevel);
    checkLevel(levelControlsConteiner, event);
    viewLevelSelector = selectLevel;
  });
  checkLevel(levelControlsConteiner);

  // Timer
  const gameField = renderElement('div', 'game-field', gameFieldContainer);
  const counterContainer = renderElement('div', 'counter-container', gameField);
  const time = renderElement('span', 'time', counterContainer);
  time.textContent = '00:00';
  viewTime = time;
  setInterval(countTime, 1000);

  //Game field
  const field = renderElement('div', 'field', gameField);
  viewField = field;

  const solutionButton = renderButton(gameField, 'solution');
  solutionButton.innerText = 'Solution';
  solutionButton.addEventListener('click', showSolution);
}

// ФУНКЦИЯ РЕНДЕРА ИГРОВОГО ПОЛЯ
export function renderGameField() {
  if (viewField.childNodes.length > 0) {
    while (viewField.firstChild) {
      viewField.removeChild(viewField.lastChild);
    }
  }
  chosenFalseCells = [];
  chosenTrueCells = [];
  const verticalClues = renderElement(
    'div',
    'vertical-clues-container',
    viewField,
  );
  viewVerticalClues = verticalClues;
  const horisontalClues = renderElement(
    'div',
    'horisontal-clues-container',
    viewField,
  );
  viewHorisontalClues = horisontalClues;
  const game = renderElement('div', 'game', viewField);
  viewGame = game;
  game.addEventListener('click', checkAndRerenderMatrix);
  game.addEventListener('contextmenu', makeCeilCrossed);

  createHorisontalHints(horisontalClues);
  createVerticalHints(verticalClues);
  createGame(game);
}

function createGame(parent) {
  const matrix = randomMatrixObj.matrix;
  for (let i = 0; i < matrix.length; i += 1) {
    const row = renderElement('div', 'row', parent);
    for (let j = 0; j < matrix[i].length; j += 1) {
      const ceil = renderElement('div', 'ceil', row);
      ceil.innerText = matrix[i][j];
      ceil.setAttribute('data-value', matrix[i][j]);
      ceil.setAttribute('data-index', `${i},${j}`);
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

// Рендер второго селектора
function checkLevel(parent, event) {
  let level = 'Easy';
  if (event) {
    level = event.target.value;
    parent.removeChild(parent.childNodes[parent.childNodes.length - 1]);
    model.setLevel(level);
    model.setImage(0);
    model.generateDefault();
    renderGameField();
    chosenTrueCells = [];
    chosenFalseCells = [];
    viewTime.textContent = '00:00';
    seconds = 1;
  }
  const imagesArr = findImageNames(level);

  const selectImage = renderElement('select', 'level', parent);
  imagesArr.forEach((level) => {
    const option = renderElement('option', '', selectImage);
    option.textContent = level;
  });
  viewImageSelector = selectImage;
  viewImageIndex = selectImage.selectedIndex;
  localStorage.setItem('image', viewImageIndex);

  selectImage.addEventListener('change', (secondEvent) => {
    model.setLevel(level);
    if (secondEvent.detail !== undefined) {
      model.setImage(secondEvent.detail);
      selectImage.selectedIndex = secondEvent.detail;
    } else {
      model.setImage(secondEvent.target.selectedIndex);
    }
    model.generateDefault();
    renderGameField();
    viewImageIndex = selectImage.selectedIndex;
    localStorage.setItem('image', viewImageIndex);
    chosenTrueCells = [];
    chosenFalseCells = [];
    viewTime.textContent = '00:00';
    seconds = 1;
    viewImageSelector = selectImage;
  });
}

// Рендер кнопок
function renderButton(parent, type) {
  return renderElement('button', 'button', parent, type);
}

//Рендер модалки
function renderModal(event) {
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
  // const modalGreetings = renderElement('h2', 'result-message', modalWindow);
  // modalGreetings.innerText = 'Great!';
  // const modalText = renderElement('h2', 'result-message', modalWindow);
  // const winTime = localStorage.getItem('time');
  // modalText.textContent = `You have solved the nonogram in ${winTime} seconds!`;

  if (!event) {
    renderWinModal(modalWindow);
  } else {
    console.log('scores');
    // event.target.classList.contains('scores')
    renderScoreModal(modalWindow);
  }
}

function renderWinModal(parent) {
  const modalGreetings = renderElement('h2', 'result-message', parent);
  modalGreetings.innerText = 'Great!';
  const modalText = renderElement('h2', 'result-message', parent);
  const winTime = localStorage.getItem('time');
  modalText.textContent = `You have solved the nonogram in ${winTime} seconds!`;
}

function renderScoreModal(parent) {
  const modalList = renderElement('ul', 'result-message', parent);
  modalList.innerText = 'Best scores:';

  const resultsStr = localStorage.getItem('JSFE2023Q4results');
  const results = JSON.parse(resultsStr);

  results.forEach((el) => {
    const modalItem = renderElement(
      'li',
      'result-message',
      modalList,
      'modal-list-item',
    );
    modalItem.innerText = `Time: ${el[0]}, Level:  ${el[1]}, Image name: ${el[2]}`;
  });
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
let chosenTrueCells = [];
let chosenFalseCells = [];
let crossedCellsArr = [];
let darkedCellsArr = [];

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
  const index = event.target.dataset.index;
  if (!event.target.classList.contains('dark')) {
    darkSound.play();
    event.target.classList.add('dark');
    darkedCellsArr.push(index);
  } else {
    clearSound.play();
    event.target.classList.remove('dark');
    let delitingIndex = darkedCellsArr.indexOf(index);
    darkedCellsArr.splice(delitingIndex, 1);
  }
}

function makeCeilCrossed(event) {
  event.preventDefault();
  if (viewGame.classList.contains('disabled')) {
    return;
  }
  const index = event.target.dataset.index;
  if (!event.target.classList.contains('crossed')) {
    crossSound.play();
    event.target.classList.add('crossed');
    crossedCellsArr.push(index);
  } else {
    clearSound.play();
    event.target.classList.remove('crossed');
    let delitingIndex = crossedCellsArr.indexOf(index);
    crossedCellsArr.splice(delitingIndex, 1);
  }
}

function checkMatrix(event) {
  if (trueСellsArray.length === chosenTrueCells.length) {
    if (chosenFalseCells.length === 0) {
      console.log('You win!');
      disableGame();
      winSound.play();
      localStorage.setItem('time', currentTime);
      renderModal(event);
      //Сохранение результатов в ЛС
      rememberResults();
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

function saveGame() {
  const savedGame = {
    level: viewLevel,
    image: viewImageIndex,
    time: currentTime,
    seconds: seconds,
    crossedCells: crossedCellsArr,
    darkedCells: darkedCellsArr,
  };

  localStorage.setItem('savedGame', JSON.stringify(savedGame));
}

function renderSelectors(level, imageIndex) {
  viewLevelSelector.value = level;
  const event = new Event('change');
  viewLevelSelector.dispatchEvent(event);
  viewImageIndex = imageIndex;
  const imageEvent = new CustomEvent('change', { detail: viewImageIndex });
  viewImageSelector.dispatchEvent(imageEvent);
}

function continueGame() {
  isPaused = false;
  const savedGameinStr = localStorage.getItem('savedGame');
  const savedGame = JSON.parse(savedGameinStr);

  currentTime = savedGame.time;
  seconds = savedGame.seconds;
  viewLevel = savedGame.level;
  viewImageIndex = savedGame.image;
  darkedCellsArr = savedGame.darkedCells;
  crossedCellsArr = savedGame.crossedCells;

  // viewLevelSelector.value = viewLevel;
  // const event = new Event('change');
  // viewLevelSelector.dispatchEvent(event);
  // viewImageIndex = savedGame.image;
  // const imageEvent = new CustomEvent('change', { detail: viewImageIndex });
  // viewImageSelector.dispatchEvent(imageEvent);
  renderSelectors(viewLevel, viewImageIndex);

  model.setLevel(viewLevel);
  model.setImage(viewImageIndex);
  model.generateDefault();
  renderGameField();

  viewGame.childNodes.forEach((row) => {
    row.childNodes.forEach((cell) => {
      let cellIndex = cell.dataset.index;
      darkedCellsArr.forEach((item) => {
        if (item === cellIndex) {
          cell.classList.add('dark');
        }
      });
      crossedCellsArr.forEach((item) => {
        if (item === cellIndex) {
          cell.classList.add('crossed');
        }
      });
    });
  });
}

function showSolution() {
  isPaused = true;
  disableGame();
  viewGame.childNodes.forEach((row) => {
    row.childNodes.forEach((cell) => {
      if (cell.dataset.value === '1') {
        cell.classList.add('dark');
      }
    });
  });
}

function rememberResults() {
  if (!localStorage.getItem('JSFE2023Q4results')) {
    const results = [];
    localStorage.setItem('JSFE2023Q4results', JSON.stringify(results));
  }

  const resultsStr = localStorage.getItem('JSFE2023Q4results');
  const results = JSON.parse(resultsStr);

  const currentResult = [];
  currentResult.push(currentTime);
  currentResult.push(viewLevel);
  currentResult.push(viewImageSelector.value);

  results.push(currentResult);

  if (results.length > 5) {
    results.splice(0, 1);
  }
  results.sort((a, b) => (a.currentTime < b.currentTime ? -1 : 1));

  localStorage.setItem('JSFE2023Q4results', JSON.stringify(results));
}
