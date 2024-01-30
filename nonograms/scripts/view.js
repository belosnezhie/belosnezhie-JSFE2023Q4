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
  setInterval(countTime, 1000);

  //Field
  const field = renderElement('div', 'field', gameField);
  const verticalClues = renderElement('div', 'vertical-clues-container', field);
  viewVerticalClues = verticalClues;
  const horisontalClues = renderElement(
    'div',
    'horisontal-clues-container',
    field,
  );
  viewHorisontalClues = horisontalClues;
  const game = renderElement('div', 'game', gameField);
  viewGame = game;
}

// Рендер игрового поля

import { randomMatrixObj } from './model.js';

function createGame() {
  // для каждой строки массива создать див с классом row
  // внутри этого дива создать дивы с классом ceil
}
// количество черных клеточек - подсказка

// Рендер кнопок
function renderButton(parent, type) {
  return renderElement('button', 'button', parent, type);
}

// Функция таймера
function countTime() {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;

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
