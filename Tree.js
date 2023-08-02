import { ctx } from "./cavnas";

export class Tree {
  #trunkImage = null;

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
    ctx.drawImage(this.#trunkImage, 0, 240, 140, 340, x, y + 240, 140, 340);
    ctx.strokeStyle = "#00ff44";
    ctx.strokeRect(x + 40, y + 275, this.width, this.height);
  }

  renderSecondLayer(x, y) {
    ctx.drawImage(this.#trunkImage, 0, -100, 140, 340, x, y - 100, 140, 340);
    ctx.strokeStyle = "#00ff44";
    ctx.strokeRect(x + 40, y + 275, this.width, this.height);
  }
}
