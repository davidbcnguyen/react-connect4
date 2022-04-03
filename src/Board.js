import Column from "./Column";

function Board(props) {
    const { currentSymbol } = props;
    const cols = [];
    for (let i = 0; i < 7; i++) {
        cols.push(<Column currentSymbol={currentSymbol}></Column>)
    }

    return (
        <div className="board">
            {cols}
        </div>
    )
}

export default Board;