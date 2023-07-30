import { render } from "./render";

const gameLoop = function(timestamp) {
  render();
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
