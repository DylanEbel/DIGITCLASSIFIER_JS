import { Tile } from "./tile.js"

export class Board {
  constructor() {
    this.tileBoard = [];
    this.tileBoardEl = document.getElementById("tile-board");

    this.PopulateBoard();
  }

  ClearBoard() {
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 28; j++) {
        let tile = this.tileBoard[i][j];
        tile.tileEl.style.setProperty("background-color", "white");
        tile.alpha = 0;
      }
    }
  }

  LoadState(boardState) {
    this.ClearBoard()

    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 28; j++) {
        let desAlpha = boardState[i * 28 + j]
        let tile = this.tileBoard[i][j]
        tile.alpha = desAlpha;
        tile.highlight(desAlpha);
      }
    }
  }

  PopulateBoard() {
    for (let i = 0; i < 28; i++) {
      const row = [];
      for (let j = 0; j < 28; j++) {
        const tile = new Tile(j, i, this.tileBoardEl, this.tileBoard);
        //   console.log(`${i}, ${j}`);
        row.push(tile);
      }
      this.tileBoard.push(row);
    }
  }
}
