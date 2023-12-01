const app = document.getElementById("app");
const canvasElem = document.createElement("canvas");

canvasElem.setAttribute("id", "canvas");
canvasElem.setAttribute("tabindex", 1);
canvasElem.style.display = "block";

app.appendChild(canvasElem);
