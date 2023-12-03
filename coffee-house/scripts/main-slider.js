let sliderLine =  document.querySelector(".slider-line"),
    prevButton = document.querySelector(".arrow-button-left"),
    nextButton = document.querySelector(".arrow-button-right"),
    progressBarItems = document.querySelectorAll(".progress-bar"),
    slides = document.querySelectorAll(".slide");


let position = 0,
    step = 480,
    activeProgressIndex = 0;

const refreshTimer = () => {
  intervalInMs = 5000;
  elapsedTime = 5000;
  startTime = new Date();
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

  refreshTimer();
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

  refreshTimer();
  autoScroll();
}

const indicateProgressItem = (index) => {
  progressBarItems.forEach((item) => {
    item.classList.remove("active");
  })

  progressBarItems[index].classList.add("active");
}


nextButton.addEventListener("click", showNextSlide);
prevButton.addEventListener("click", showPrevSlide);


let timer;
let pauseTime;
let elapsedTime;
let startTime;
let intervalInMs;
refreshTimer();

const autoScroll = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    startTime = new Date();
    showNextSlide();
  }, intervalInMs);
}

autoScroll();

const pauseAutoScroll = () => {
  progressBarItems.forEach((item) => {
    item.classList.add("paused-progress");
  })

  clearTimeout(timer);
  if (startTime === undefined) {
    startTime = new Date();
  }
  pauseTime = new Date();
  intervalInMs = elapsedTime;
  elapsedTime = intervalInMs - (pauseTime.getTime() - startTime.getTime());
}

const resumeAutoScroll = () => {
  startTime = new Date();
  timer = setTimeout(() => {
    showNextSlide();
    startTime = new Date();
  }, elapsedTime);

  progressBarItems.forEach((item) => {
    item.classList.remove("paused-progress");
  })
}

slides.forEach((item) => {
  item.addEventListener("mouseenter", pauseAutoScroll);
  item.addEventListener("mouseleave", resumeAutoScroll);
})
