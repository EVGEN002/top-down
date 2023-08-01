import { canvas, ctx, canvasHeight, canvasWidth } from "./cavnas";
import { Entity } from "./Entity";

const player = new Entity(
  canvasWidth / 2,
  canvasHeight / 2,
  50,
  50,
  10,
  "iddle"
);

let spriteX = 4;
let spriteY = 7;
let runUpX = 0;
let runUpY = 0;
let aInterval = 0;

const iddleSpriteImg = document.createElement("img");
iddleSpriteImg.setAttribute("src", "./level1_idle.png");
iddleSpriteImg.style.display = "none";

const runUpSpriteImg = document.createElement("img");
runUpSpriteImg.setAttribute("src", "level1_running.png");
runUpSpriteImg.style.display = "none";

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

  if (player.animation === "iddle") {
    ctx.drawImage(
      iddleSpriteImg,
      spriteX,
      spriteY,
      31,
      50,
      player.x,
      player.y,
      31,
      50
    );
  } else if (player.animation === "runUp") {
    ctx.drawImage(
      runUpSpriteImg,
      runUpX,
      runUpY,
      45,
      62,
      player.x,
      player.y,
      45,
      62
    );
  }
};

setInterval(() => {
  if (player.animation === "iddle") {
    spriteX += 46;
    if (spriteX === 970) {
      spriteX = 4;
    }
  }
}, 150);

setInterval(() => {
  if (player.animation === "runUp") {
    runUpX += 44;
    if (runUpX === 924) {
      runUpX = 0;
    }
  }
}, 30);

// setInterval(() => {
//   if (player.animation === "runDown") {
//     runUpX += 44;
//     if (runUpX === 924) {
//       runUpX = 0;
//     }
//   }
// }, 30);

let pressed = new Set();

window.addEventListener("keydown", (event) => {
  pressed.add(event.key);
  if (!aInterval) {
    aInterval = setInterval(() => {
      switch (true) {
        case (pressed.has("ArrowUp") && pressed.has("ArrowLeft")):
          player.animation = "runUp";
          runUpY = 462;
          player.y -= player.speed / 1.5;
          player.x -= player.speed / 1.5;
          break;
        case (pressed.has("ArrowUp") && pressed.has("ArrowRight")):
          player.animation = "runUp";
          runUpY = 65;
          player.y -= player.speed / 1.5;
          player.x += player.speed / 1.5;
          break;
        case (pressed.has("ArrowDown") && pressed.has("ArrowRight")):
          player.animation = "runUp";
          runUpY = 201;
          player.y += player.speed / 1.5;
          player.x += player.speed / 1.5;
          break;
        case (pressed.has("ArrowDown") && pressed.has("ArrowLeft")):
          player.animation = "runUp";
          runUpY = 331;
          player.y += player.speed / 1.5;
          player.x -= player.speed / 1.5;
          break;
        case (pressed.has("ArrowUp")):
          player.animation = "runUp";
          player.y -= player.speed;
          break;
          case (pressed.has("ArrowLeft")):
          player.animation = "runUp";
          runUpY = 397;
          player.x -= player.speed;
          break;
        case (pressed.has("ArrowRight")):
          player.animation = "runUp";
          runUpY = 130;
          player.x += player.speed;
          break;
        case (pressed.has("ArrowDown")):
          player.animation = "runUp";
          runUpY = 266;
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
      spriteY = 7;
      break;
    case "ArrowDown":
      pressed.delete("ArrowDown");
      player.animation = "iddle";
      runUpY = 0;
      spriteY = 232;
      break;
    case "ArrowLeft":
      pressed.delete("ArrowLeft");
      player.animation = "iddle";
      runUpY = 0;
      spriteY = 349;
      break;
    case "ArrowRight":
      player.animation = "iddle";
      runUpY = 0;
      spriteY = 117;
      pressed.delete("ArrowRight");
      break;
    default:
      pressed.clear();
  }
});

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowUp") {
//     if (!aInterval) {
//       aInterval = setInterval(function() {
//         if (player.y > 0) {
//           player.y -= player.speed;
//           player.animation = "run";
//         }
//       }, 30);
//     }
//   }
// });

// window.addEventListener("keyup", (event) => {
//   if (aInterval) {
//     clearInterval(aInterval);
//     aInterval = 0;
//     player.animation = "iddle";
//   }
// })

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowDown") {
//     if (player.y < canvasHeight) {
//       player.y += player.speed;
//     }
//   }
// });

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowLeft") {
//     if (player.x > 0) {
//       player.x -= player.speed;
//     }
//   }
// });

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowRight") {
//     if (player.x < canvasWidth) {
//       player.x += player.speed;
//     }
//   }
// });

// startAnimation();
