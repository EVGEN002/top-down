import { canvas, ctx, canvasHeight, canvasWidth } from "./cavnas";
import { Sprite } from "./sprite";
import { playerSprite } from "./playerSprite";

const player = new Sprite(canvasWidth/ 2, canvasHeight/ 2, 50, 50, 10);

let spriteX = 9;
let spriteY = 14;

export const render = function() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`player y: ${player.y}`, 50, 50);

  ctx.fillStyle = "#FFFFFF";
  // ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.drawImage(playerSprite, spriteX, spriteY, 61, 99, player.x, player.y, 61, 99);

  function iddling() {
    setTimeout(() => {
      spriteX += 31;
    }, 5000)
  }
  iddling()
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    if (player.y > 0) {
      player.y -= player.speed;
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    if (player.y < canvasHeight) {
      player.y += player.speed;
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (player.x > 0) {
      player.x -= player.speed;
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    if (player.x < canvasWidth) {
      player.x += player.speed;
    }
  }
});