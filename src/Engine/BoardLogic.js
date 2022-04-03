export default class BoardLogic {
    #height;
    #width;
    #winCond;
    #matrix;
    #isOver;

    constructor(height, width, winCond) {
        this.#height = height;
        this.#width = width;
        this.#winCond = winCond;
        this.#matrix = BoardLogic.emptyBoard(height, width);
        this.#isOver = false;
    }

    get isOver() {
        return this.#isOver;
    }

    static emptyBoard(height, width) {
        const b = [];
        for (let w = 0; w < width; w++) {
            b.push(new Array(height));
        }
        return b;
    }

    print(offset=0) {
        for (let y = 0; y < this.#height; y++) {
            let row = "- ";
            for (let x = 0; x < this.#width; x++) {
                row += `${this.#matrix[x][y] === undefined ? " " : this.#matrix[x][y]} `;
            }
            console.log(row);
        }
        let legend = "  ";
        for (let i = 0; i < this.#width; i++) {
            legend += `${i + offset} `;
        }
        console.log(legend);

        let border = "";
        for (let i = 0; i < legend.length; i++) {
            border += "=";
        }
        console.log(border);
    }

    move(symbol, column) {
        if (column < 0 || this.#width <= column) {
            return false;
        }
        if (this.#matrix[column][0] !== undefined) {
            return false;
        }
        let y = 0;
        while(y + 1 < this.#height && this.#matrix[column][y + 1] === undefined) {
            y++;
        }
        this.#matrix[column][y] = symbol;

        this.#isOver |= this.#checkHorizontal(symbol, column, y);
        this.#isOver |= this.#checkVertical(symbol, column, y);
        this.#isOver |= this.#checkDiagonal1(symbol, column, y);
        this.#isOver |= this.#checkDiagonal2(symbol, column, y);

        return true;
    }

    #checkHorizontal(symbol, x, y) {
        let count = 0;
        let from = Math.max(0, x - (this.#winCond - 1));
        const to = Math.min(this.#width - 1, x + (this.#winCond - 1));
        for (from; from <= to; from++) {
            if (this.#matrix[from][y] === symbol) {
                count++;
                if (count === this.#winCond) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    #checkVertical(symbol, x, y) {
        let count = 0;
        let from = Math.max(0, y - (this.#winCond - 1));
        const to = Math.min(this.#height - 1, y + (this.#winCond - 1));
        for (from; from <= to; from++) {
            if (this.#matrix[x][from] === symbol) {
                count++;
                if (count === this.#winCond) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }


    // For diagonals like /
    #checkDiagonal1(symbol, x, y) {
        let count = 0;
        let offsetFrom = -(this.#winCond - 1);
        const offsetTo = this.#winCond - 1;
        for (offsetFrom; offsetFrom <= offsetTo; offsetFrom++) {
            if (!this.#inBoard(x + offsetFrom, y - offsetFrom)) {
                continue;
            }
            if (this.#matrix[x + offsetFrom][y - offsetFrom] === symbol) {
                count++;
                if (count === this.#winCond) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    // For diagonals like \
    #checkDiagonal2(symbol, x, y) {
        let count = 0;
        let offsetFrom = -(this.#winCond - 1);
        const offsetTo = this.#winCond - 1;
        for (offsetFrom; offsetFrom <= offsetTo; offsetFrom++) {
            if (!this.#inBoard(x + offsetFrom, y + offsetFrom)) {
                continue;
            }
            if (this.#matrix[x + offsetFrom][y + offsetFrom] === symbol) {
                count++;
                if (count === this.#winCond) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    #inBoard(x, y) {
        return 0 <= x && x < this.#width && 0 <= y && y < this.#height;
    }
}