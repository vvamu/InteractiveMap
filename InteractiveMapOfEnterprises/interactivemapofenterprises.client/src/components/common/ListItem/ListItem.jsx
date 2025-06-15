
import classes from "./ListItem.module.css";

const openIcon = "/open.svg";
const editIcon = "/edit.svg";
const deleteIcon = "/delete.svg";


export default function ListItem({ children, style, onClick}) {
    const defaultStyles = {
        backgroundColor: "rgb(255 255 255 / 80%)",
        marginBottom:"15px"
        
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    return (<li className={classes.item + " cart"} style={combinedStyles} onClick={onClick }>
        {children}
    </li>)
}