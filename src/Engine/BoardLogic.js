export default class BoardLogic {
    #height;
    #width;
    #winCond;
    #matrix;
    #winningCord;

    constructor(height, width, winCond) {
        this.#height = height;
        this.#width = width;
        this.#winCond = winCond;
        this.#matrix = BoardLogic.emptyBoard(height, width);
        this.#winningCord = [];
    }

    get winningCord() {
        return this.#winningCord;
    }

    get isOver() {
        return this.#winningCord.length >= this.#winCond;
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
        if (this.isOver) {
            return false;
        }
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

        const hori = this.#checkHorizontal(symbol, column, y);
        const vert = this.#checkVertical(symbol, column, y);
        const dia1 = this.#checkDiagonal1(symbol, column, y);
        const dia2 = this.#checkDiagonal2(symbol, column, y);

        if (hori.length === this.#winCond) {
            this.#winningCord = hori;
        } else if (vert.length === this.#winCond) {
            this.#winningCord = vert;
        } else if (dia1.length === this.#winCond) {
            this.#winningCord = dia1;
        } else if (dia2.length === this.#winCond) {
            this.#winningCord = dia2;
        }

        return true;
    }

    #checkHorizontal(symbol, x, y) {
        let winningCords = [];
        let from = Math.max(0, x - (this.#winCond - 1));
        const to = Math.min(this.#width - 1, x + (this.#winCond - 1));
        for (from; from <= to; from++) {
            if (this.#matrix[from][y] === symbol) {
                winningCords.push([from, y]);
                if (winningCords.length === this.#winCond) {
                    return winningCords;
                }
            } else {
                winningCords = [];
            }
        }
        return [];
    }

    #checkVertical(symbol, x, y) {
        let winningCords = [];
        let from = Math.max(0, y - (this.#winCond - 1));
        const to = Math.min(this.#height - 1, y + (this.#winCond - 1));
        for (from; from <= to; from++) {
            if (this.#matrix[x][from] === symbol) {
                winningCords.push([x, from]);
                if (winningCords.length === this.#winCond) {
                    return winningCords;
                }
            } else {
                winningCords = [];
            }
        }
        return [];
    }


    // For diagonals like /
    #checkDiagonal1(symbol, x, y) {
        let winningCords = [];
        let offsetFrom = -(this.#winCond - 1);
        const offsetTo = this.#winCond - 1;
        for (offsetFrom; offsetFrom <= offsetTo; offsetFrom++) {
            if (!this.#inBoard(x + offsetFrom, y - offsetFrom)) {
                continue;
            }
            if (this.#matrix[x + offsetFrom][y - offsetFrom] === symbol) {
                winningCords.push([x + offsetFrom, y - offsetFrom]);
                if (winningCords.length === this.#winCond) {
                    return winningCords;
                }
            } else {
                winningCords = []
            }
        }
        return [];
    }

    // For diagonals like \
    #checkDiagonal2(symbol, x, y) {
        let winningCords = [];
        let offsetFrom = -(this.#winCond - 1);
        const offsetTo = this.#winCond - 1;
        for (offsetFrom; offsetFrom <= offsetTo; offsetFrom++) {
            if (!this.#inBoard(x + offsetFrom, y + offsetFrom)) {
                continue;
            }
            if (this.#matrix[x + offsetFrom][y + offsetFrom] === symbol) {
                winningCords.push([x + offsetFrom, y + offsetFrom]);
                if (winningCords.length === this.#winCond) {
                    return winningCords;
                }
            } else {
                winningCords = [];
            }
        }
        return [];
    }

    #inBoard(x, y) {
        return 0 <= x && x < this.#width && 0 <= y && y < this.#height;
    }
}