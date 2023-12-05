let sliderLine =  document.querySelector(".slider-line"),
    prevButton = document.querySelector(".arrow-button-left"),
    nextButton = document.querySelector(".arrow-button-right"),
    progressBarItems = document.querySelectorAll(".progress-bar"),
    slides = document.querySelectorAll(".slide");


let position = 0,
    step,
    activeProgressIndex = 0;


const refreshStep = () => {
  if (window.innerWidth >= 740) {
    step = 480;
  } else {
    step = 348;
  }
}

document.addEventListener("DOMContentLoaded", refreshStep);

window.addEventListener("resize", refreshStep);

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


let startX,
    startY,
    endX,
    endY,
    direction;

const checkStart = (event) => {
  event.preventDefault();

  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;

  pauseAutoScroll();
}

const checkSwipeEnding = (event) => {
  endX = event.changedTouches[0].clientX;
  endY = event.changedTouches[0].clientY;
  direction = startX - endX;

  if (direction < 0) {
    resumeProgressAnimation();
    showPrevSlide();
    return;
  }
  if (direction > 0) {
    resumeProgressAnimation();
    showNextSlide();
    return;
  }
  if (direction === 0) {
    resumeAutoScroll();
    return;
  }
 }


slides.forEach((item) => {
  item.addEventListener("touchstart", checkStart);
  item.addEventListener("touchend", checkSwipeEnding);
})

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

  resumeProgressAnimation();
}

slides.forEach((item) => {
  item.addEventListener("mouseenter", pauseAutoScroll);
  item.addEventListener("mouseleave", resumeAutoScroll);
})


function refreshTimer() {
  intervalInMs = 5000;
  elapsedTime = 5000;
  startTime = new Date();
}

function resumeProgressAnimation() {
  progressBarItems.forEach((item) => {
    item.classList.remove("paused-progress");
  })
}
