let sliderLine =  document.querySelector(".slider-line"),
    prevButton = document.querySelector(".arrow-button-left"),
    nextButton = document.querySelector(".arrow-button-right"),
    progressBarItems = document.querySelectorAll(".progress-bar");


let position = 0,
    // cureentSlideIndex = 0,
    // capacity = 3,
    step = 480,
    activeProgressIndex = 0;

const findActiveProgressItem = (index) => {

}

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
}


nextButton.addEventListener("click", showNextSlide);
prevButton.addEventListener("click", showPrevSlide);

