export class NeuralNetUtils {
    static MatMulAndBias(X, W, B) {
        // console.log(W)
        const XLen = X.length
        const WRows = W[0].length;
        const WCols = W.length;
        const BRows = B.length;
        const BCols = B[0].length;

        if (XLen != WRows || WCols != BRows || BCols != 1) {
            throw new Error("Matrix Sizes don't match")
        }

        const result = []

        for (let i = 0; i < WCols; i++) {
            let sum = 0;
            for (let j = 0; j < XLen; j++) {
                sum += X[j] * W[i][j];
            }
            result[i] = sum + B[i][0];
        }
        
        return result;
    }

    static TransposeVector(vector) {
        const matrix = new Array(vector.length);
        for (let i = 0; i < vector.length; i++) {
            matrix[i] = [vector[i]]
        }
        return matrix;
    }

    static ReLU(Z) {
        return Z.map(v => (v > 0 ? v : 0));
    }

    static ReLUDeriv(Z) {
        return Z.map((v) => (v > 0 ? 1 : 0));
    }

    static SoftMax(Z) {
        let maxVal = Number.MIN_SAFE_INTEGER
        for (let i = 0; i < Z.length; i++) {
            if (Z[i] > maxVal) maxVal = Z[i];
        }

        let sum = 0
        const exps = []
        for (let i = 0; i < Z.length; i++) {
            exps[i] = Math.exp(Z[i] - maxVal)
            sum += exps[i]
        }

        const output = []
        for (let i = 0; i < Z.length; i++) {
            output[i] = exps[i] / sum;
        }
        return output;
    }

    static ForwardPass(X, W1, W2, W3, b1, b2, b3) {
        const z1 = this.MatMulAndBias(X, W1, b1);
        const a1 = this.ReLU(z1);

        const z2 = this.MatMulAndBias(a1, W2, b2);
        const a2 = this.ReLU(z2);

        const z3 = this.MatMulAndBias(a2, W3, b3);
        const output = this.SoftMax(z3);

        return { z1, a1, z2, a2, z3, output}
    }

    static MaxIndex(output) {
        let maxIndex = 0
        let maxVal = Number.MIN_SAFE_INTEGER

        for (let i = 0; i < output.length; i++) {
            if (output[i] > maxVal) {
                maxIndex = i
                maxVal = output[i]
            }
        }

        return maxIndex
    }
}