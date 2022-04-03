import { useState } from "react";

function Column(props) {
    const { currentSymbol, makeMove } = props;
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
                col.map((symbol, idx) => <li key={idx}>{symbol || "_"}</li>)
            }</ul>
        </div>
    )
}

export default Column;