import { dataFetchUtil } from "./dataFetchUtil.js";
import { NeuralNetUtils } from "./neuralNetUtils.js";

export class DigitClassifier {
  constructor(url) {
    this.W1 = null;
    this.W2 = null;
    this.W3 = null;
    this.b1 = null;
    this.b2 = null;
    this.b3 = null;
    this.mnist_test = null;
    this.SetWeightsAndBiases(url);
  }

  async SetWeightsAndBiases(url) {
    const { W1, W2, W3, b1, b2, b3, mnist_test } = await dataFetchUtil.GetWeightsAndBiases(
      url
    );

    this.W1 = W1;
    this.W2 = W2;
    this.W3 = W3;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.mnist_test = mnist_test;
  }

  SetAlphaVals(boardState) {
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[0].length; j++) {
        this.alphaVals[i * boardState.length + j] = boardState[i][j].alpha;
      }
    }
  }

  GetRandomBoard() {
    const randBoard = this.mnist_test[(Math.floor(Math.random() * this.mnist_test.length))]
    return [randBoard[0], randBoard.slice(1)]
  }

  ClassifyDigit(boardState) {
    this.alphaVals = [];

    this.SetAlphaVals(boardState);
    // console.log(this.alphaVals);

    const { z1, a1, z2, a2, z3, output } = NeuralNetUtils.ForwardPass(
      this.alphaVals,
      this.W1,
      this.W2,
      this.W3,
      this.b1,
      this.b2,
      this.b3
    );
    
    const prediction = NeuralNetUtils.MaxIndex(output)

    return [prediction, output[prediction], output]
  }
}
