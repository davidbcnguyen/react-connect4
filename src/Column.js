import { useState } from "react";

function Column(props) {
    const { x, currentSymbol, makeMove, winningCord } = props;
    const [col, setCol] = useState([undefined, undefined, undefined, undefined, undefined, undefined]);

    const clickHandler = () => {
        if (makeMove()) {
            let i = 5;
            while (0 <= i) {
                if (col[i] !== undefined) {
                    i--;
                } else {
                    break;
                }
            }
            col[i] = currentSymbol;
            setCol(col);
        }
    }

    return (
        <div className="column" onClick={clickHandler}>
            <ul>{
                col.map((symbol, idx) => <li key={[idx, x]} className={winningCord.filter(ele => ele[0] === x && ele[1] -1 === idx).length ? "winning" : ""} >{symbol || "_"}</li>)
            }</ul>
        </div>
    )
}

export default Column;