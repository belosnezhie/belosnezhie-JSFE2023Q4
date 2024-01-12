import data from "./data.json" assert { type: "json" };

const questionObj = guessWord(),
  wordLettersElements = [];

let globalCounterContainer = undefined,
  mistakes = 0;

const renderGame = () => {
  const appWrapper = renderElement("div", "app-wrapper", document.body);
  const appDescription = renderElement("div", "description", appWrapper);
  const title = renderElement("h1", "title", appDescription);
  title.innerText = "Hangman game";
  const gallows = renderElement("div", "gallows", appDescription);
  renderImages(gallows);
  const gameField = renderElement("div", "game-field", appWrapper);
  const wordContainer = renderElement("div", "word-container", gameField);
  const questionContainer = renderElement(
    "div",
    "question-container",
    gameField,
  );
  // let questionObj = guessWord();
  renderWord(wordContainer, questionObj);
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
  data.imagesArr.forEach((item) => {
    const image = document.createElement("img");
    item.classes.forEach((myClass) => image.classList.add(myClass));
    image.setAttribute("src", item.src);
    image.setAttribute("alt", item.alt);
    parent.append(image);
  });
}

function renderWord(parent, questionObj) {
  let word = questionObj.answer;
  let wordArr = word.split("");
  wordArr.forEach((item) => {
    const letter = document.createElement("span");
    letter.classList.add("letter");
    letter.classList.add("hidden-text");
    letter.innerText = item.toUpperCase();
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
    characterButton.addEventListener("click", checkLetter);
    parent.append(characterButton);
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
  // const letterArr = document.querySelectorAll(".letter");
  // let word = "";
  // for (let i = 0; i < letterArr.length; i++) {
  //   word += letterArr[i].innerText;
  // }
  secretWord.innerText = `Secret word: ${questionObj.answer.toUpperCase()}`;
}

function randomQuestion(min, max) {
  let randonInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randonInteger);
}

function guessWord() {
  let questionNumber = randomQuestion(1, 15);
  return data.questionsArr[questionNumber];
}

// Game logic

function checkLetter(event) {
  const chosenLetter = event.target.innerText;
  const word = questionObj.answer.toUpperCase();
  if (word.includes(chosenLetter) === true) {
    wordLettersElements.forEach((item) => {
      if (item.innerText === chosenLetter) {
        item.classList.remove("hidden-text");
      }
    });
    if (
      wordLettersElements.every(
        (item) => item.classList.contains("hidden-text") === false,
      )
    ) {
      renderModal("win");
    }
  } else {
    if (mistakes >= 6) {
      renderModal("lose");
    }
    mistakes++;
    renderCounter(globalCounterContainer, mistakes);
  }
}
