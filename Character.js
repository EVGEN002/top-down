import { ctx } from "./canvas";

export class Character {
  #iddleImage = null;
  #iddleShadowImage = null;
  #runImage = null;
  #runShadowImage = null;
  iddleShadowX = 0
  iddleShadowY = 0
  iddleX = 0;
  iddleY = 0;
  runShadowX = 0;
  runShadowY = 0;
  runX = 0;
  runY = 0;
  xCollision = null;
  yCollision = null
  widthCollision = null;
  heightCollision = null;

  constructor(
    x,
    y,
    width,
    height,
    speed,
    animation,
    iddleSrc,
    iddleShadowSrc,
    runSrc,
    runShadowSrc
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.animation = animation;
    this.iddleSrc = iddleSrc;
    this.iddleShadowSrc = iddleShadowSrc;
    this.runSrc = runSrc;
    this.runShadowSrc = runShadowSrc;
  }

  mount() {
    this.#iddleImage = document.createElement("img");
    this.#iddleImage.setAttribute("src", this.iddleSrc);

    this.#iddleShadowImage = document.createElement("img");
    this.#iddleShadowImage.setAttribute("src", this.iddleShadowSrc);

    this.#runImage = document.createElement("img");
    this.#runImage.setAttribute("src", this.runSrc);

    this.#runShadowImage = document.createElement("img");
    this.#runShadowImage.setAttribute("src", this.runShadowSrc);
  }

  render() {
    switch (this.animation) {
      case "iddle":
        // Iddle shadow
        ctx.globalAlpha = 0.4;
        ctx.drawImage(
          this.#iddleShadowImage,
          this.iddleShadowX,
          this.iddleShadowY,
          164,
          78,
          this.x + 25,
          this.y + 62,
          164,
          78
        );

        // Iddle
        ctx.globalAlpha = 1;
        ctx.drawImage(
          this.#iddleImage,
          this.iddleX,
          this.iddleY,
          92,
          116,
          this.x,
          this.y,
          92,
          116
        );
        break;
      case "run":
        // Run shadow
        ctx.globalAlpha = 0.4;
        ctx.drawImage(
          this.#runShadowImage,
          this.runShadowX,
          this.runShadowY,
          190,
          68,
          this.x + 10,
          this.y + 62,
          190,
          68
        );

        // Run
        ctx.globalAlpha = 1;
        ctx.drawImage(
          this.#runImage,
          this.runX,
          this.runY,
          88,
          132,
          this.x,
          this.y,
          88,
          132
        );
        break;
    }
    ctx.strokeStyle = "#00FF44";
    ctx.strokeRect(this.x + 21, this.y + 30, 50, 85);
  }
}
