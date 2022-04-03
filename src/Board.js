import { useState } from "react";
import Column from "./Column";
import BoardLogic from "./Engine/BoardLogic";
import Over from "./Over";

const boardLogic = new BoardLogic(7, 6, 4);

function Board() {
    const symbols = ["O", "X"];
    const [player, setPlayer] = useState(0);
    const [isOver, setIsOver] = useState(false);

    const colClickGenerator = (col) => {
        return () => {
            if (boardLogic.move(symbols[player], col)) {
                setPlayer((player + 1) % 2);
                setIsOver(boardLogic.isOver);
                return true;
            } else {
                return false;
            }
        }
    }

    const cols = [];
    for (let i = 0; i < 7; i++) {
        cols.push(<Column key={i} currentSymbol={symbols[player]} makeMove={colClickGenerator(i)}></Column>)
    }

    return (
        <div>
            <div className="board">
                {cols}
            </div>
            <Over isOver={isOver}></Over>
        </div>
    )
}

export default Board;