function Over(props) {
    const { isOver } = props;
    return (
        <div>{isOver ? "Game over!" : ""}</div>
    )
}

export default Over;