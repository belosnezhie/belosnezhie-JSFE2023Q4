let sliderLine =  document.querySelector(".slider-line"),
    prevButton = document.querySelector(".arrow-button-left"),
    nextButton = document.querySelector(".arrow-button-right"),
    progressBarItems = document.querySelectorAll(".progress-bar");


let position = 0,
    // cureentSlideIndex = 0,
    // capacity = 3,
    step = 480,
    activeProgressIndex = 0;

const showNextSlide = () => {

  if (position > -(progressBarItems.length - 1) * step) {
    position -= step;
    activeProgressIndex += 1;
  } else {
    position = 0;
    activeProgressIndex = 0;
  }

  sliderLine.style.left = position + "px";

  indicateProgressItem(activeProgressIndex);

  autoScroll();
};

const showPrevSlide = () => {

  if (position < 0) {
    position += step;
    activeProgressIndex -= 1;
  } else {
    position = -(progressBarItems.length - 1) * step;
    activeProgressIndex = progressBarItems.length - 1;
  }

  sliderLine.style.left = position + "px";

  indicateProgressItem(activeProgressIndex);
}

const indicateProgressItem = (index) => {
  progressBarItems.forEach((item) => {
    item.classList.remove("active");
  })

  progressBarItems[index].classList.add("active");

  autoScroll();
}


nextButton.addEventListener("click", showNextSlide);
prevButton.addEventListener("click", showPrevSlide);


let timer;

const autoScroll = () => {
  clearInterval(timer);
  timer = setTimeout(() =>{
    showNextSlide();
    // indicateProgressItem(activeProgressIndex);
  }, 5000);
}

autoScroll();


// мне нужно заполнять прогресс бар не в момент открытия нового слайда и до его закрытия, а
// отражать время до следующего автоматического переключения
// убрать indicateProgressItem из функции переключения
// добавить indicateProgressItem в фукцию autoScroll
// вернуть транзишн на афтер у каждого прогрессбара (чтобы время исполнения работало и на уменьшение заполнения)
// повесить анимэйшнэнд на функцию indicateProgressItem чтобы заполнение нового начиналось только после заполнения старого

// в итоге просто поменяла транзишн у псевдоэллемента програсс единицы, все работает, но
// - не отражается уменьшение прогресс бара предыдущей картинки
// - хочется, чтобы заполнение прогресс бара начиналось только после того, как закончится анимация смены картинки

