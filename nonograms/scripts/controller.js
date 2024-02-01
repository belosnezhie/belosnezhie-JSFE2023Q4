export function start(view, model) {
  model.setLevel('Easy');
  model.setImage(0);
  // view.setCheckAndRerenderMatrix(checkAndRerenderMatrix);
  view.renderApp();
  view.renderGameField();
}

// const saveTime = () => {
//   localStorage.setItem('time', currentTime);
// }

// function checkAndRerenderMatrix() {
//   compareExpectedAndActual();
// }
