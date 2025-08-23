import { Board } from "./board.js"
import { DigitClassifier } from "./DigitClassifier.js";

const board = new Board()
const digitClassifier = new DigitClassifier("https://dylanthevillain45.github.io/DigitClassifierWeights/")

// const widthIndicator = document.getElementById("size-indicator");
// const widthSlider = document.getElementById("size-slider");

// widthSlider.addEventListener("input", () => {
//   UpdateWidth(widthSlider.value);
// });

// function UpdateWidth(val) {
//   widthIndicator.textContent = val;
//   document.documentElement.style.setProperty("--cell-size", `${val}px`);
//   console.log(document.documentElement.style.getPropertyValue("--cell-size"));
// }


// const guessArea = document.getElementById("guess-area");

for (let i = 0; i < 10; i++) {
  let entry = document.createElement('p')
  entry.textContent = i;
  entry.classList.add("guess-area")
  entry.id = i
  // guessArea.appendChild(entry);
}

const resetButton = document.getElementById("reset-button");
const runButton = document.getElementById("run-button")
const randButton = document.getElementById("random-button")

resetButton.addEventListener("click", () => {
  outputText.textContent = ''
  confidenceText.textContent = "Confidence: ";
  // for (let i = 0; i < 10; i++) {
  //   let guess = document.getElementById(i)
  //   guess.textContent = i
  // }
  board.ClearBoard()
});

randButton.addEventListener("click", () => {
  board.LoadState(digitClassifier.GetRandomBoard()[1])
  Run()
})

const outputText = document.getElementById("output-text")
const confidenceText = document.getElementById("confidence-text");

let output
runButton.addEventListener("click", () => {
  Run()
})

function Run() {
  output = digitClassifier.ClassifyDigit(board.tileBoard);
  outputText.textContent = output[0];
  confidenceText.textContent = `Confidence: ${(output[1] * 100).toFixed(2)}%`;
  // for (let i = 0; i < 10; i++) {
  //   let guess = document.getElementById(i)
  //   guess.textContent = `${i}: ${Math.round(output[2][i])}`
  // }
}