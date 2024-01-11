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

  const gallows = document.createElement("gallows");
  gallows.classList.add("gallows");

  appDescription.append(gallows);

  renderImages(gallows);
}

renderGame();

function renderImages(parent) {
  data.imagesArr.forEach((item) => {
    const image = document.createElement("img");
    image.classList.add(item.class);
    image.setAttribute("src", item.src);
    image.setAttribute("alt", item.alt);
    parent.append(image);
  });
}
