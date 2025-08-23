export class dataFetchUtil {
    static dataFiles = ["W1", "W2", "W3", "b1", "b2", "b3", "mnist_test"]

    static async GetWeightsAndBiases(url) {
        let result = []

        for (let file of dataFetchUtil.dataFiles) {
            result[file] = await dataFetchUtil.loadCSV(`${url}${file}.csv`);
        }

        return result
    }

    static async loadCSV(url) {
        const text = await fetch(url).then(res => res.text())
        return text.trim().split("\n").map(row => row.split(",").map(Number))
    }
}