let sliderLine =  document.querySelector(".slider-line"),
      prevButton = document.querySelector(".arrow-button-left"),
      nextButton = document.querySelector(".arrow-button-right"),
      progressBarItems = document.querySelectorAll(".progress-bar");


let position = 0,
    cureentSlideIndex = 0,
    capacity = 3,
    step = 480,
    activeProgressIndex = 0;

const findActiveProgressItem = (index) => {

}

const showNextSlide = () => {

  if (position > -(progressBarItems.length - 1) * step) {
    position -= step;
  } else {
    position = 0;
  }

  sliderLine.style.left = position + "px";
};

const showPrevSlide = () => {

  if (position < 0) {
    position += step;
  } else {
    position = -(progressBarItems.length - 1) * step;
  }

  sliderLine.style.left = position + "px";
}

nextButton.addEventListener("click", showNextSlide);
prevButton.addEventListener("click", showPrevSlide);

