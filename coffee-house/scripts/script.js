// Burger-menu
const burgerButton = document.querySelector(".burger-button"),
      burgerMenu = document.querySelector(".navigation-column");

const openCloseBurgerMenu = () => {
  burgerButton.classList.toggle("active-button");
  burgerMenu.classList.toggle("hidden-menu");
  const body = document.querySelector("body");
  body.classList.toggle("no-scroll");
}

burgerButton.addEventListener("click", openCloseBurgerMenu);

document.querySelectorAll(".nav-item").forEach((el) => {
  el.addEventListener("click", openCloseBurgerMenu);
})

burgerMenu.children[1].addEventListener("click", openCloseBurgerMenu);

