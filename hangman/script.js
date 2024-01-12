import data from "./data.json" assert { type: "json" };

function renderGame() {
  const appWrapper = document.createElement("div");
  appWrapper.classList.add("app-wrapper");

  document.body.append(appWrapper);

  const appDescription = document.createElement("div");
  appDescription.classList.add("description");

  appWrapper.append(appDescription);

  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerText = "Hangman game";

  appDescription.append(title);

  const gallows = document.createElement("gallows");
  gallows.classList.add("gallows");

  appDescription.append(gallows);

  renderImages(gallows);

  const gameField = document.createElement("div");
  gameField.classList.add("game-field");

  appWrapper.append(gameField);

  const wordContainer = document.createElement("div");
  wordContainer.classList.add("word-container");

  gameField.append(wordContainer);

  renderWord(wordContainer);

  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");

  gameField.append(questionContainer);

  renderQuestion(questionContainer);

  const counterContainer = document.createElement("div");
  counterContainer.classList.add("counter-container");

  gameField.append(counterContainer);

  renderCounter(counterContainer, 0);

  const keyboardContainer = document.createElement("div");
  keyboardContainer.classList.add("keyboard-container");

  gameField.append(keyboardContainer);

  renderKeybord(keyboardContainer);
}

renderGame();

// Функция для рендеринга отдельных элементов чтобы убрать простыню из renderGame()
// function renderElement(elTag, elClass, elParent) {
//   const el = document.createElement(elTag);
//   el.classList.add(elClass);
//   elParent.append(el);
// }

function renderImages(parent) {
  data.imagesArr.forEach((item) => {
    const image = document.createElement("img");
    item.classes.forEach((myClass) => image.classList.add(myClass));
    image.setAttribute("src", item.src);
    image.setAttribute("alt", item.alt);
    parent.append(image);
  });
}

function renderWord(parent) {
  let questionNumber = randomQuestion(1, 15);
  let word = data.questionsArr[questionNumber].answer;
  let wordArr = word.split("");
  wordArr.forEach((item) => {
    const letter = document.createElement("span");
    letter.classList.add("letter");
    // letter.classList.add("hidden-text");
    // letter.innerText = item;
    parent.append(letter);
  });
}

function renderQuestion(parent) {
  let questionNumber = randomQuestion(1, 15);
  let question = data.questionsArr[questionNumber].question;
  const questionEl = document.createElement("p");
  questionEl.classList.add("hint");
  questionEl.innerText = `Hint: ${question}`;
  parent.append(questionEl);
}

function renderCounter(parent, mistake) {
  const counter = document.createElement("span");
  counter.classList.add("counter");
  counter.innerText = `Mistakes: ${mistake}/6`;
  parent.append(counter);
}

function renderKeybord(parent) {
  data.alfabet.forEach((item) => {
    const characterButton = document.createElement("button");
    characterButton.classList.add("button");
    characterButton.innerText = item;
    parent.append(characterButton);
  });
}

function randomQuestion(min, max) {
  let randonInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randonInteger);
}
