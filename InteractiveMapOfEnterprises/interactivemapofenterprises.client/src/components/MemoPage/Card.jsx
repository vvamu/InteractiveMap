function Card({ item, id, handleClick }) {
    const itemClass = item.stat ? " active " + item.stat : ""

    return (
        <div className={"card" + itemClass} onClick={() => {
            handleClick(id);
            console.log(id);
        }}>
            <img src={item.img} alt="" />
        </div>
    )
}

export default Card