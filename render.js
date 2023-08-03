import { canvas, ctx, canvasHeight, canvasWidth } from "./canvas";
import { Character } from "./Character";
import { Tree } from "./Tree";

const trunk = new Tree(300, 300, 50, 50, "./hr-tree-01-a-trunk.png");
trunk.mount();

const treeImg = document.createElement("img");
treeImg.setAttribute("src", "./hr-tree-01-a-trunk.png");
treeImg.style.display = "none";

const leavesImg = document.createElement("img");
leavesImg.setAttribute("src", "./hr-tree-01-a-leaves.png");
leavesImg.style.display = "none";

const player = new Character(
  canvasWidth / 2,
  canvasHeight / 2,
  50,
  50,
  10,
  "iddle",
  "./hr-level1_idle.png",
  "./hr-level1_idle_shadow.png",
  "./hr-level1_running.png",
  "./run-shadow.png"
);
player.mount();

let aInterval = 0;

const terrainImg = document.createElement("img");
terrainImg.setAttribute("src", "./slice.png");
terrainImg.style.display = "none";

export const render = function () {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const pattern = ctx.createPattern(terrainImg, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`player y: ${player.y}`, 50, 50);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`iddle: ${player.animation}`, 50, 70);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`runY: ${player.runY}`, 50, 90);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`runX: ${player.runX}`, 50, 110);

  // trees.forEach(element => {
  //   ctx.drawImage(treeImg, 0, 0, 140, 340, element[0], element[1], 140, 340);
  //   ctx.drawImage(leavesImg, 0, 0, 184, 306, element[0] - 25, element[1] - 25, 184, 306);
  // });
  trunk.renderFirstLayer(300, 300);
  trunk.renderFirstLayer(400, 400);

  player.render();
  // ctx.strokeStyle = "#00ff44";
  // ctx.strokeRect(player.x + 15, player.y, 60, 120);

  trunk.renderSecondLayer(300, 300);
  trunk.renderSecondLayer(400, 400);
};

setInterval(() => {
  if (player.animation === "iddle") {
    player.iddleX += 92;
    if (player.iddleX === 2024) {
      player.iddleX = 0;
    }
    player.iddleShadowX += 164;
    if (player.iddleShadowX === 3608) {
      player.iddleShadowX = 0;
    }
  }
}, 150);

setInterval(() => {
  if (player.animation === "run") {
    player.runX += 88;
    if (player.runX === 1936) {
      player.runX = 0;
    }
    player.runShadowX += 190;
    if (player.runShadowX === 4180) {
      player.runShadowX = 0;
    }
  }
}, 30);

let pressed = new Set();

window.addEventListener("keydown", (event) => {
  pressed.add(event.key);
  if (!aInterval) {
    aInterval = setInterval(() => {
      switch (true) {
        case (pressed.has("ArrowUp") && pressed.has("ArrowLeft")):
          player.animation = "run";
          player.runY = 924;
          player.runShadowY = 68;
          if (player.y )
          player.y -= player.speed / 1.5;
          player.x -= player.speed / 1.5;
          break;
        case (pressed.has("ArrowUp") && pressed.has("ArrowRight")):
          player.animation = "run";
          player.runY = 132;
          player.y -= player.speed / 1.5;
          player.x += player.speed / 1.5;
          break;
        case (pressed.has("ArrowDown") && pressed.has("ArrowRight")):
          player.animation = "run";
          player.runY = 396;
          player.runShadowY = 204;
          player.y += player.speed / 1.5;
          player.x += player.speed / 1.5;
          break;
        case (pressed.has("ArrowDown") && pressed.has("ArrowLeft")):
          player.animation = "run";
          player.runY = 660;
          player.runShadowY = 340;
          player.y += player.speed / 1.5;
          player.x -= player.speed / 1.5;
          break;
        case (pressed.has("ArrowUp")):
          player.animation = "run";
          player.y -= player.speed;
          player.runY = 0;
          player.runShadowY = 0;
          break;
          case (pressed.has("ArrowLeft")):
          player.animation = "run";
          player.runY = 792;
          player.runShadowY = 406;
          player.x -= player.speed;
          break;
        case (pressed.has("ArrowRight")):
          player.animation = "run";
          player.runY = 264;
          player.runShadowY = 136;
          player.x += player.speed;
          break;
        case (pressed.has("ArrowDown")):
          player.animation = "run";
          player.runY = 528;
          player.runShadowY = 272;
          player.y += player.speed;
          break;
      }
    }, 30);
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      pressed.delete("ArrowUp");
      player.animation = "iddle";
      player.iddleY = 0;
      player.iddleShadowY = 0;
      break;
    case "ArrowDown":
      pressed.delete("ArrowDown");
      player.animation = "iddle";
      player.runY = 0;
      player.iddleY = 464;
      player.iddleShadowY = 312;
      break;
    case "ArrowLeft":
      pressed.delete("ArrowLeft");
      player.animation = "iddle";
      player.runY = 0;
      player.iddleY = 696;
      player.iddleShadowY = 468;
      break;
    case "ArrowRight":
      player.animation = "iddle";
      player.runY = 0;
      player.iddleY = 232;
      player.iddleShadowY = 156;
      pressed.delete("ArrowRight");
      break;
    default:
      pressed.clear();
  }
});
