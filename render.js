import { canvas, ctx, canvasHeight, canvasWidth } from "./cavnas";
import { Entity } from "./Entity";

// import movement from "./movement";
// movement();

const trees = [
  [100, 100],
  [150, 200],
  [10, 200],
  [250, 160]
];

const treeImg = document.createElement("img");
treeImg.setAttribute("src", "./hr-tree-01-a-trunk.png");
treeImg.style.display = "none";

const leavesImg = document.createElement("img");
leavesImg.setAttribute("src", "./hr-tree-01-a-leaves.png");
leavesImg.style.display = "none";

const player = new Entity(
  canvasWidth / 2,
  canvasHeight / 2,
  50,
  50,
  10,
  "run"
);

let iddleX = 0;
let iddleY = 0;
let iddleShadowX = 0;
let iddleShadowY = 0;
let runX = 0;
let runY = 0;
let runShadowX = 0;
let runShadowY = 0;
let aInterval = 0;

const iddleSpriteImg = document.createElement("img");
iddleSpriteImg.setAttribute("src", "./hr-level1_idle.png");
iddleSpriteImg.style.display = "none";

const iddleShadowImg = document.createElement("img");
iddleShadowImg.setAttribute("src", "./hr-level1_idle_shadow.png");
iddleShadowImg.style.display = "none";

const runShadowImg = document.createElement("img");
runShadowImg.setAttribute("src", "./run-shadow.png");
runShadowImg.style.display = "none";

const runSpriteImg = document.createElement("img");
runSpriteImg.setAttribute("src", "hr-level1_running.png");
runSpriteImg.style.display = "none";

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
  ctx.strokeText(`runY: ${runY}`, 50, 90);

  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`runX: ${runX}`, 50, 110);

  trees.forEach(element => {
    ctx.drawImage(treeImg, 0, 0, 140, 340, element[0], element[1], 140, 340);
    ctx.drawImage(leavesImg, 0, 0, 184, 306, element[0] - 25, element[1] - 25, 184, 306);
  });


  if (player.animation === "iddle") {
    ctx.globalAlpha = 0.4;
    ctx.drawImage(
      iddleShadowImg,
      iddleShadowX,
      iddleShadowY,
      164,
      78,
      player.x + 25,
      player.y + 62,
      164,
      78
    );
    ctx.globalAlpha = 1;
    ctx.drawImage(
      iddleSpriteImg,
      iddleX,
      iddleY,
      92,
      116,
      player.x,
      player.y,
      92,
      116
    );
  } else if (player.animation === "run") {
    ctx.globalAlpha = 0.4;
    ctx.drawImage(
      runShadowImg,
      runShadowX,
      runShadowY,
      190,
      68,
      player.x + 10,
      player.y + 62,
      190,
      68
    );
    ctx.globalAlpha = 1;
    ctx.drawImage(
      runSpriteImg,
      runX,
      runY,
      88,
      132,
      player.x,
      player.y,
      88,
      132
    );
  }
};

setInterval(() => {
  if (player.animation === "iddle") {
    iddleX += 92;
    if (iddleX === 2024) {
      iddleX = 0;
    }
    iddleShadowX += 164;
    if (iddleShadowX === 3608) {
      iddleShadowX = 0;
    }
  }
}, 150);

setInterval(() => {
  if (player.animation === "run") {
    runX += 88;
    if (runX === 1936) {
      runX = 0;
    }
    runShadowX += 190;
    if (runShadowX === 4180) {
      runShadowX = 0;
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
          runY = 924;
          runShadowY = 68;
          player.y -= player.speed / 1.5;
          player.x -= player.speed / 1.5;
          break;
        case (pressed.has("ArrowUp") && pressed.has("ArrowRight")):
          player.animation = "run";
          runY = 132;
          player.y -= player.speed / 1.5;
          player.x += player.speed / 1.5;
          break;
        case (pressed.has("ArrowDown") && pressed.has("ArrowRight")):
          player.animation = "run";
          runY = 396;
          runShadowY = 204;
          player.y += player.speed / 1.5;
          player.x += player.speed / 1.5;
          break;
        case (pressed.has("ArrowDown") && pressed.has("ArrowLeft")):
          player.animation = "run";
          runY = 660;
          runShadowY = 340;
          player.y += player.speed / 1.5;
          player.x -= player.speed / 1.5;
          break;
        case (pressed.has("ArrowUp")):
          player.animation = "run";
          player.y -= player.speed;
          runY = 0;
          runShadowY = 0;
          break;
          case (pressed.has("ArrowLeft")):
          player.animation = "run";
          runY = 792;
          runShadowY = 406;
          player.x -= player.speed;
          break;
        case (pressed.has("ArrowRight")):
          player.animation = "run";
          runY = 264;
          runShadowY = 136;
          player.x += player.speed;
          break;
        case (pressed.has("ArrowDown")):
          player.animation = "run";
          runY = 528;
          runShadowY = 272;
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
      iddleY = 0;
      iddleShadowY = 0;
      break;
    case "ArrowDown":
      pressed.delete("ArrowDown");
      player.animation = "iddle";
      runY = 0;
      iddleY = 464;
      iddleShadowY = 312;
      break;
    case "ArrowLeft":
      pressed.delete("ArrowLeft");
      player.animation = "iddle";
      runY = 0;
      iddleY = 696;
      iddleShadowY = 468;
      break;
    case "ArrowRight":
      player.animation = "iddle";
      runY = 0;
      iddleY = 232;
      iddleShadowY = 156;
      pressed.delete("ArrowRight");
      break;
    default:
      pressed.clear();
  }
});
