let isMouseDown = false;
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

export class Tile {
  constructor(x, y, parentElement, tileBoard) {
    this.x = x;
    this.y = y;
    this.alpha = 0;
    this.tileEl = document.createElement("div");
    this.tileEl.classList.add("tile");
    this.tileEl.id = `${x}, ${y}`;
    parentElement.appendChild(this.tileEl);
    this.tileBoard = tileBoard;
    this.tileEl.addEventListener("mousedown", () => this.handleClick());
    this.tileEl.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        this.handleClick();
      }
    });
  }

  highlight(alpha) {
    this.alpha = alpha;
    let gray = 255 - Math.floor(alpha);
    // console.log(gray);
    this.tileEl.style.setProperty(
      "background-color",
      `rgb(${gray}, ${gray}, ${gray})`
    );
  }

  handleClick(radius = 1) {
     this.highlight(255);

     for (let i = -radius; i <= radius; i++) {
       for (let j = -radius; j <= radius; j++) {
         if (i === 0 && j === 0) continue;

         let newY = this.y + i;
         let newX = this.x + j;
         if (newY > 27 || newY < 0 || newX > 27 || newX < 0) continue;

         // distance-based falloff
         let distance = Math.sqrt(i * i + j * j);
         if (distance > radius) continue;

         let sideTile = this.tileBoard[newY][newX];
         let falloff = Math.max(0, 200 - distance * 60);
         if (sideTile.alpha == 0) {
           sideTile.highlight(falloff + Math.floor(Math.random() * 40)); // with variance
         }
       }
     }
  }
}
