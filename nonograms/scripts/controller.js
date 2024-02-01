export function start(view, model) {
  model.setLevel('Easy');
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
