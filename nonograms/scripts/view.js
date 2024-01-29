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
  const resetButton = renderElement(
    'button',
    'button',
    buttonsContainer,
    'reset',
  );
  resetButton.innerText = 'Reset game';

  const saveButton = renderElement(
    'button',
    'button',
    buttonsContainer,
    'save',
  );
  saveButton.innerText = 'Save game';

  const continueButton = renderElement(
    'button',
    'button',
    buttonsContainer,
    'continue',
  );
  continueButton.innerText = 'Continue last game';

  const randomButton = renderElement(
    'button',
    'button',
    buttonsContainer,
    'random',
  );
  randomButton.innerText = 'Random game';

  const gameFieldContainer = renderElement(
    'div',
    'game-field-container',
    gameWrapper,
  );

  const levelControlsConteiner = renderElement(
    'div',
    'level-controls-conteiner',
    gameWrapper,
  );

  const levelControlsTitle = renderElement('h2', '', levelControlsConteiner);
  levelControlsTitle.innerText = 'Choose complexity and image';

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
}

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
