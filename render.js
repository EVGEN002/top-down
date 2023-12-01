import { ctx, canvasHeight, canvasWidth } from "./canvas";
import { Character } from "./Character";
import { Tree } from "./Tree";
import { terminal } from "./terminal";

const trunk = new Tree(300, 300, 50, 50, "./assets/tree/hr-tree-01-a-trunk.png");
trunk.mount();

const treeImg = document.createElement("img");
treeImg.setAttribute("src", "./assets/tree/hr-tree-01-a-trunk.png");
treeImg.style.display = "none";

const leavesImg = document.createElement("img");
leavesImg.setAttribute("src", "./assets/tree/hr-tree-01-a-leaves.png");
leavesImg.style.display = "none";

const player = new Character(
  canvasWidth / 2,
  canvasHeight / 2,
  50,
  50,
  10,
  "iddle",
  "./assets/character/hr-level1_idle.png",
  "./assets/character/hr-level1_idle_shadow.png",
  "./assets/character/hr-level1_running.png",
  "./assets/character/run-shadow.png"
);
player.mount();

let aInterval = 0;

const terrainImg = document.createElement("img");
terrainImg.setAttribute("src", "./assets/terrain/slice.png");
terrainImg.style.display = "none";

export const render = function () {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const pattern = ctx.createPattern(terrainImg, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  trunk.renderFirstLayer(300, 300);
  trunk.renderFirstLayer(400, 400);

  player.render();

  trunk.renderSecondLayer(300, 300);
  trunk.renderSecondLayer(400, 400);

  terminal(ctx);
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
          break;
        case (pressed.has("ArrowUp") && pressed.has("ArrowRight")):
          player.animation = "run";
          player.runY = 132;
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
