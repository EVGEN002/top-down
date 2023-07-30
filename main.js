const app = document.getElementById("app");
const canvasElem = document.createElement("canvas");

canvasElem.setAttribute("id", "canvas");
canvasElem.setAttribute("tabindex", 1);
// canvasElem.style.width = "100%";
// canvasElem.style.height = "100%";
canvasElem.style.display = "block";

app.appendChild(canvasElem);

// canvasElem.width = window.innerWidth;
// canvasElem.height = window.innerHeight;

// export const ctx = canvasElem.getContext("2d");

// const player = {
//   x: canvasElem.width / 2,
//   y: canvasElem.height / 2,
//   width: 50,
//   height: 50,
//   speed: 5
// }

// const fps = 30;

// function gameLoop() {
//   ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);

//   ctx.fillStyle = "#000000";
//   ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

//   ctx.fillStyle = "#FFFFFF";
//   ctx.fillRect(player.x, player.y, player.width, player.height);


//   setTimeout(() => {
//     requestAnimationFrame(gameLoop);
//   }, 1000 / fps);
// }

// gameLoop();

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowUp") {
//     player.y -= player.speed;
//   } else if (event.key === "ArrowDown") {
//     player.y += player.speed;
//   }
//   if (event.key === "ArrowLeft") {
//     player.x -= player.speed;
//   } else if (event.key === "ArrowRight") {
//     player.x += player.speed;
//   }
//   setTimeout(() => {
//   }, 1);
// });
