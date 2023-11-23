// Burger-menu
const burgerButton = document.querySelector(".burger-button"),
      burgerMenu = document.querySelector(".navigation-column")
      body = document.querySelector("body");

const openCloseBurgerMenu = () => {
  burgerButton.classList.toggle("active-button");
  burgerMenu.classList.toggle("hidden-menu");
  body.classList.toggle("no-scroll");
}

burgerButton.addEventListener("click", openCloseBurgerMenu);

document.querySelectorAll(".nav-item").forEach((el) => {
  el.addEventListener("click", openCloseBurgerMenu);
})

burgerMenu.children[1].addEventListener("click", openCloseBurgerMenu);

