import { ctx, canvasHeight, canvasWidth } from "./canvas";
import { Character } from "./Character";
import { Tree } from "./Tree";

const trunk = new Tree(
  300,
  300,
  50,
  50,
  "./assets/tree/hr-tree-01-a-trunk.png"
);
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
  4,
  "iddle",
  "./assets/character/hr-level1_idle.png",
  "./assets/character/hr-level1_idle_shadow.png",
  "./assets/character/hr-level1_running.png",
  "./assets/character/run-shadow.png"
);
player.mount();

const terrainImg = document.createElement("img");
terrainImg.setAttribute("src", "./assets/terrain/slice.png");
terrainImg.style.display = "none";

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

export const render = function () {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (rightPressed) {
    player.animation = "run";
    player.runY = 264;
    player.runShadowY = 136;
    player.x += player.speed;
  } else if (leftPressed) {
    player.animation = "run";
    player.runY = 792;
    player.runShadowY = 406;
    player.x -= player.speed;
  }
  if (downPressed) {
    player.animation = "run";
    player.runY = 528;
    player.runShadowY = 272;
    player.y += player.speed;
  } else if (upPressed) {
    player.animation = "run";
    player.runY = 0;
    player.runShadowY = 0;
    player.y -= player.speed;
  }
  if (rightPressed && downPressed) {
    player.runY = 396;
    player.runShadowY = 204;
  }
  if (leftPressed && downPressed) {
    player.runY = 660;
    player.runShadowY = 340;
  }
  if (rightPressed && upPressed) {
    player.runY = 132;
  }
  if (leftPressed && upPressed) {
    player.runY = 924;
    player.runShadowY = 68;
  }

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

  ctx.font = "16px monospace";
  ctx.strokeStyle = "#FFFFFF";
  ctx.strokeText(`${player.animation}`, 20, 36);
  // terminal(ctx);
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
}, 20);

function keyUpHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = false;
    player.animation = "iddle";
  } else if (event.keyCode === 37) {
    leftPressed = false;
    player.animation = "iddle";
  }
  if (event.keyCode === 40) {
    downPressed = false;
    player.iddleY = 464;
    player.runShadowY = 312;
    player.animation = "iddle";
  } else if (event.keyCode === 38) {
    player.iddleY = 0;
    player.runShadowY = 0;
    upPressed = false;
    player.animation = "iddle";
  }
}

function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true;
  } else if (event.keyCode === 37) {
    leftPressed = true;
  }
  if (event.keyCode === 40) {
    downPressed = true;
  } else if (event.keyCode === 38) {
    upPressed = true;
  }
}

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
