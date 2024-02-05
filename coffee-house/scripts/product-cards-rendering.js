import products from './products.json' assert {type: "json"};

const menuSlides = document.querySelector(".menu-slide"),
      tabs = document.querySelectorAll(".product-type-controller"),
      resumeButton = document.querySelector(".refresh-button"),
      resumeButtonContainer = document.querySelector(".refresh-button-container"),
      modalWrapper = document.querySelector(".modal-wrapper"),
      modalWindow = document.querySelector(".modal-window"),
      closeButton = document.querySelector(".close-button");

const renderProducts = () => {

  const activeInput = document.querySelector("input[name=menu-controller]:checked");
  const category = activeInput.id;

  const filteredProducts = products.filter((item) => item.category === category);

  let innerHTML = "";

  filteredProducts.forEach((item) => {
    innerHTML += `<div class="menu-slide-item">
                <div class="product-window">
                  <img class="product-image" src="${item.image}" alt="${item.category}">
                </div>
                <div class="product-properties-container">
                  <h3 class="product-title">${item.name}</h3>
                  <p class="product-description">${item.description}</p>
                  <h3 class="product-price">$${item.price}</h3>
                </div>
              </div>`
  })

  menuSlides.innerHTML = innerHTML;

  menuSlides.childNodes.forEach((item) => {
    item.addEventListener("click", (event) => {
      const title = item.querySelector(".product-title").innerHTML;
      const product = products.filter((itm) => itm.name === title)[0];
      renderModalWindow(product);
      showModalWindow(event);
    });
  })
}

const hydeItems = () => {
  if (document.documentElement.getBoundingClientRect().width <= 768) {
      const productItems = menuSlides.childNodes;
      if (productItems.length > 4) {
        resumeButtonContainer.classList.remove("hidden");
        for (let i = 4; i < productItems.length; i++) {
          productItems[i].classList.add("hidden-in-tablet");
        }
      }
      else {
        resumeButtonContainer.classList.add("hidden");
      }
    } else {
      resumeButtonContainer.classList.add("hidden");
    }
}

const showHiddenItems = () => {
  const productItems = menuSlides.childNodes;
  for (let i = 0; i < productItems.length; i++) {
    productItems[i].classList.remove("hidden-in-tablet");
  }
  resumeButtonContainer.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  hydeItems();
});

window.addEventListener("resize", hydeItems);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    renderProducts();
    hydeItems();
  })
});

resumeButton.addEventListener("click", showHiddenItems);

function showModalWindow(event) {
  modalWrapper.classList.remove("hidden-modal-wrapper");
  document.querySelector("body").classList.add("no-scroll");
  event._isClickWithInMenu = true;
}

function closeModalWindow(event) {
  modalWrapper.classList.add("hidden-modal-wrapper");
  document.querySelector("body").classList.remove("no-scroll");
  event._isClickWithInMenu = true;
}

modalWindow.addEventListener("click", event => {
  event._isClickWithInMenu = true;
});

closeButton.addEventListener("click", (event) => closeModalWindow(event));

document.querySelector("body").addEventListener("click", event => {
    if (event._isClickWithInMenu === true) {
      return;
    }
    modalWrapper.classList.add("hidden-modal-wrapper");
    document.querySelector("body").classList.remove("no-scroll");
  }
);


function renderModalWindow(product) {
  const modalWindow = document.querySelector(".modal-window");
  const productImage = modalWindow.querySelector(".product-image"),
        productTitle = modalWindow.querySelector(".product-title"),
        productDescription = modalWindow.querySelector(".product-description"),
        productSizes = modalWindow.querySelectorAll(".size"),
        productAdditives = modalWindow.querySelectorAll(".additive"),
        productPrice = modalWindow.querySelector(".price");

  productImage.setAttribute("src", product.image);
  productTitle.innerHTML = product.name;
  productDescription.innerHTML = product.description;

  productSizes[0].innerHTML = product.sizes.s.size;
  productSizes[1].innerHTML = product.sizes.m.size;
  productSizes[2].innerHTML = product.sizes.l.size;

  productAdditives[0].innerHTML = product.additives[0].name;
  productAdditives[1].innerHTML = product.additives[1].name;
  productAdditives[2].innerHTML = product.additives[2].name;

  productAdditives[0].setAttribute("data-add-price", product.additives[0]["add-price"]);
  productAdditives[1].setAttribute("data-add-price", product.additives[1]["add-price"]);
  productAdditives[2].setAttribute("data-add-price", product.additives[2]["add-price"]);


  const sizeControllers = modalWindow.querySelectorAll("input[name=size-controller]");
  sizeControllers.forEach((item) => {
    item.checked = false;
  })
  sizeControllers[0].checked = true;
  sizeControllers.forEach((controller) => {
    controller.addEventListener("click", () => addAdditionalPrices(modalWindow, productPrice, product));
  })

  const additiveControllers = modalWindow.querySelectorAll("input[name=additive-controller]");
  additiveControllers.forEach((item) => {
    item.checked = false;
  })
  additiveControllers.forEach((controller) => {
    controller.addEventListener("click", () => addAdditionalPrices(modalWindow, productPrice, product));
  })

  productPrice.innerHTML = "$" + Number(product.price).toLocaleString("en-US", {minimumFractionDigits: 2});
}

function addAdditionalPrices(modalWindow, productPrice, product) {
  let total = Number (product.price);
  const activeSizeInHTML = modalWindow.querySelector("input[name=size-controller]:checked").id;
  const addAdditionsPrice = Array.from(modalWindow.querySelectorAll("input[name=additive-controller]:checked"))
                                      .reduce((accumulator, inputNode) => {
                                        const addPrice = inputNode.getAttribute("data-add-price");
                                        return accumulator + Number (addPrice);
                                      }, 0);

  const addSizePrice = Number (product.sizes[activeSizeInHTML]["add-price"]);

  total += addSizePrice + Number (addAdditionsPrice);

  productPrice.innerHTML = "$" + total.toLocaleString("en-US", {minimumFractionDigits: 2});

}

