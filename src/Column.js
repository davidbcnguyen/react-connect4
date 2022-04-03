function Column(props) {
    const { currentSymbol } = props;
    const col = new Array(6);

    const clickHandler = () => {
        let i = 0;
        while (i < 6) {
            if (col[i] === undefined) {
                i++;
            }
        }
        col[i] = currentSymbol;
    }

    return (
        <div className="column" onClick={clickHandler}>
            <ul>{
            col.map(ele => <li>{ele}</li>)
            }</ul>
        </div>
    )
}

export default Column;