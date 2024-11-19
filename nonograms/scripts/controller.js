export function start(view, model) {
  model.setLevel('Easy');
  model.setImage(0);
  model.generateDefault();
  view.renderApp();
  view.renderGameField();
}
