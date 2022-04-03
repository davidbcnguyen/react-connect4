import { useState } from "react";
import Column from "./Column";
import BoardLogic from "./Engine/BoardLogic";
import Over from "./Over";

const boardLogic = new BoardLogic(7, 6, 4);

function Board() {
    const symbols = ["O", "X"];
    const [player, setPlayer] = useState(0);
    const [winningCord, setWinningCord] = useState([]);

    const colClickGenerator = (col) => {
        return () => {
            if (boardLogic.move(symbols[player], col)) {
                setPlayer((player + 1) % 2);
                setWinningCord(boardLogic.winningCord);
                return true;
            } else {
                return false;
            }
        }
    }

    const cols = [];
    for (let i = 0; i < 7; i++) {
        cols.push(<Column key={i} x={i} currentSymbol={symbols[player]} winningCord={winningCord} makeMove={colClickGenerator(i)}></Column>)
    }

    return (
        <div>
            <div className="board">
                {cols}
            </div>
            <Over isOver={winningCord.length >= 4}></Over>
        </div>
    )
}

export default Board;