export default (function () {
  function movement() {

    // Iddle animation
    setInterval(() => {
      if (player.animation === "iddle") {
        iddleX += 92;
        if (iddleX === 2024) {
          iddleX = 0;
        }
      }
    }, 150);

    // Run animation
    setInterval(() => {
      if (player.animation === "run") {
        runX += 88;
        if (runX === 1936) {
          runX = 0;
        }
      }
    }, 30);

    // Control events
    let pressed = new Set();

    window.addEventListener("keydown", (event) => {
      pressed.add(event.key);
      if (!aInterval) {
        aInterval = setInterval(() => {
          switch (true) {
            case pressed.has("ArrowUp") && pressed.has("ArrowLeft"):
              player.animation = "run";
              runY = 924;
              player.y -= player.speed / 1.5;
              player.x -= player.speed / 1.5;
              break;
            case pressed.has("ArrowUp") && pressed.has("ArrowRight"):
              player.animation = "run";
              runY = 132;
              player.y -= player.speed / 1.5;
              player.x += player.speed / 1.5;
              break;
            case pressed.has("ArrowDown") && pressed.has("ArrowRight"):
              player.animation = "run";
              runY = 396;
              player.y += player.speed / 1.5;
              player.x += player.speed / 1.5;
              break;
            case pressed.has("ArrowDown") && pressed.has("ArrowLeft"):
              player.animation = "run";
              runY = 660;
              player.y += player.speed / 1.5;
              player.x -= player.speed / 1.5;
              break;
            case pressed.has("ArrowUp"):
              player.animation = "run";
              player.y -= player.speed;
              break;
            case pressed.has("ArrowLeft"):
              player.animation = "run";
              runY = 792;
              player.x -= player.speed;
              break;
            case pressed.has("ArrowRight"):
              player.animation = "run";
              runY = 264;
              player.x += player.speed;
              break;
            case pressed.has("ArrowDown"):
              player.animation = "run";
              runY = 528;
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
          break;
        case "ArrowDown":
          pressed.delete("ArrowDown");
          player.animation = "iddle";
          runY = 0;
          iddleY = 464;
          break;
        case "ArrowLeft":
          pressed.delete("ArrowLeft");
          player.animation = "iddle";
          runY = 0;
          iddleY = 696;
          break;
        case "ArrowRight":
          player.animation = "iddle";
          runY = 0;
          iddleY = 232;
          pressed.delete("ArrowRight");
          break;
        default:
          pressed.clear();
      }
    });
  }

  return movement();
});
