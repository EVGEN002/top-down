import { render } from "./render";

let frameCount = 0;
const gameLoop = function(timestamp) {
  frameCount++;
  if (frameCount < 15) {
    window.requestAnimationFrame(gameLoop);
    return;
  }
  render();
  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

// function gameLoop() {
//   frameCount++;
//   if (frameCount < 15) {
//     window.requestAnimationFrame(gameLoop);
//     return;
//   }
//   frameCount = 0;
//   render();
//   window.requestAnimationFrame(gameLoop);
// }

// window.requestAnimationFrame(gameLoop)