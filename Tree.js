import { ctx } from "./canvas";

export class Tree {
  #trunkImage = null;
  xCollision = null;
  yCollision = null
  widthCollision = null;
  heightCollision = null;

  constructor(x, y, width, height, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
  }

  mount() {
    this.#trunkImage = document.createElement("img");
    this.#trunkImage.style.display = "none";
    this.#trunkImage.setAttribute("src", this.src);
  }

  renderFirstLayer(x, y) {
    ctx.drawImage(this.#trunkImage, 0, 270, 140, 340, x, y + 240, 140, 340);
    this.xCollision = x + 40;
    this.yCollision = y + 245;
    this.widthCollision = this.width;
    this.heightCollision = this.height;
    ctx.strokeStyle = "#00ff44";
    ctx.strokeRect(x + 40, y + 245, this.width, this.height);
    ctx.strokeText(`x: ${this.xCollision} y: ${this.yCollision}`, this.xCollision - 100, this.yCollision + 80);
  }

  renderSecondLayer(x, y) {
    ctx.drawImage(this.#trunkImage, 0, -70, 140, 340, x, y - 100, 140, 340);
  }
}
