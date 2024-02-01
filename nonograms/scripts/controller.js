export function start(view, model) {
  model.setLevel('easy');
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
