import data from "./data.json" assert { type: "json" };

let questionObj = guessWord(),
  wordLettersElements = [],
  buttonsElements = [];

let globalCounterContainer = undefined,
  globalGallowsContainer = undefined,
  mistakes = 0;

const renderGame = () => {
  console.log("Please, use english keyboard");
  document.body.classList.add("app");
  const appWrapper = renderElement("div", "app-wrapper", document.body);
  const appDescription = renderElement("div", "description", appWrapper);
  const title = renderElement("h1", "title", appDescription);
  title.innerText = "Hangman game";
  const gallows = renderElement("div", "gallows", appDescription);
  globalGallowsContainer = gallows;
  renderImages(gallows);
  const gameField = renderElement("div", "game-field", appWrapper);
  const wordContainer = renderElement("div", "word-container", gameField);
  const questionContainer = renderElement(
    "div",
    "question-container",
    gameField,
  );
  renderWord(wordContainer, questionObj);
  console.log(`Secret word: ${questionObj.answer}`);
  renderQuestion(questionContainer, questionObj);
  const counterContainer = renderElement("div", "counter-container", gameField);
  renderCounter(counterContainer, mistakes);
  globalCounterContainer = counterContainer;
  const keyboardContainer = renderElement(
    "div",
    "keyboard-container",
    gameField,
  );
  renderKeybord(keyboardContainer);
};

renderGame();

function renderElement(elTag, elClass, elParent) {
  const el = document.createElement(elTag);
  el.classList.add(elClass);
  elParent.append(el);
  return el;
}

function renderImages(parent) {
  const imageIndex = mistakes;
  const imageObj = data.imagesArr[imageIndex];
  const image = document.createElement("img");
  imageObj.classes.forEach((myClass) => image.classList.add(myClass));
  image.setAttribute("src", imageObj.src);
  image.setAttribute("alt", imageObj.alt);
  parent.append(image);
}

function renderWord(parent, questionObj) {
  let word = questionObj.answer;
  let wordArr = word.split("");
  wordArr.forEach(() => {
    const letter = document.createElement("span");
    letter.classList.add("letter");
    letter.classList.add("underscored");
    parent.append(letter);
    wordLettersElements.push(letter);
  });
}

function renderQuestion(parent, questionObj) {
  let question = questionObj.question;
  const questionEl = document.createElement("p");
  questionEl.classList.add("hint");
  questionEl.innerText = `Hint: ${question}`;
  parent.append(questionEl);
}

function renderCounter(parent, mistake) {
  if (globalCounterContainer === undefined) {
    const counter = document.createElement("span");
    counter.classList.add("counter");
    counter.innerText = `Mistakes: ${mistake}/6`;
    parent.append(counter);
  } else {
    globalCounterContainer.childNodes[0].innerText = `Mistakes: ${mistake}/6`;
  }
}

function renderKeybord(parent) {
  data.alfabet.forEach((item) => {
    const characterButton = document.createElement("button");
    characterButton.classList.add("button");
    characterButton.innerText = item;
    characterButton.setAttribute("id", item);
    characterButton.addEventListener("click", checkLetter);
    parent.append(characterButton);
    buttonsElements.push(characterButton);
  });
}

function renderModal(result) {
  const shadowWrapper = renderElement("div", "shadow-wrapper", document.body);
  const modalWindow = renderElement("div", "modal-window", shadowWrapper);
  const modalImg = renderElement("img", "lose-img", modalWindow);
  modalImg.setAttribute("src", "assets/images/skull.png");
  renderResults(modalWindow, result);
  renderResultWord(modalWindow);
  const tryAgainButton = renderElement(
    "button",
    "try-again-button",
    modalWindow,
  );
  tryAgainButton.innerText = "Try again!";
  tryAgainButton.addEventListener("click", tryAgain);
}

function renderResults(parent, result) {
  const resultMessage = renderElement("p", "result-message", parent);
  if (result === "win") {
    resultMessage.innerText = "You win!";
  } else {
    resultMessage.innerText = "You lose!";
  }
}

function renderResultWord(parent) {
  const secretWord = renderElement("p", "secret-word", parent);
  secretWord.innerText = `Secret word: ${questionObj.answer.toUpperCase()}`;
}

function randomQuestion(min, max) {
  let randonInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randonInteger);
}

function guessWord() {
  let questionNumber = randomQuestion(0, 14);
  return data.questionsArr[questionNumber];
}

// Game logic

function checkLetter(event) {
  let chosenLetter;
  if (event.type === "click") {
    event.target.classList.add("disabled");
    chosenLetter = event.target.innerText;
  } else {
    chosenLetter = event.key.toUpperCase();
    if (data.alfabet.includes(chosenLetter) === false) {
      return;
    }
    const virtButtonIndex = buttonsElements.findIndex((item) => {
      return item.id === chosenLetter;
    });
    if (buttonsElements[virtButtonIndex].classList.contains("disabled")) {
      return;
    }
    buttonsElements[virtButtonIndex].classList.add("disabled");
  }
  const word = questionObj.answer.toUpperCase();
  if (word.includes(chosenLetter) === true) {
    let wordArr = word.split("");
    wordArr.map((letter, index) => {
      if (letter === chosenLetter) {
        wordLettersElements[index].innerText = chosenLetter;
        wordLettersElements[index].classList.remove("underscored");
      }
    });
    if (
      wordLettersElements.every(
        (item) => item.classList.contains("underscored") === false,
      )
    ) {
      renderModal("win");
    }
  } else {
    mistakes++;
    renderImages(globalGallowsContainer);
    if (mistakes > 5) {
      renderModal("lose");
    }
    renderCounter(globalCounterContainer, mistakes);
  }
}

function tryAgain() {
  const prevWord = questionObj.answer;
  questionObj = guessWord();
  if (questionObj.answer === prevWord) {
    questionObj = guessWord();
  }
  console.clear();
  wordLettersElements = [];
  buttonsElements = [];
  globalCounterContainer = undefined;
  mistakes = 0;
  document.body.innerHTML = "";
  document.body.classList.remove("app");
  renderGame();
}

document.addEventListener("keydown", checkLetter);
