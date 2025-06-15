
import classes from "./ListItem.module.css";

const openIcon = "/open.svg";
const editIcon = "/edit.svg";
const deleteIcon = "/delete.svg";

import ButtonIcon from "../Buttons/ButtonIcon";


export default function ListItemActions({ openHandler, editHandler, deleteHandler, isCanEdit, isCanDelete }) {

    return (<div className={classes.tools}>
        {!openHandler ? null : 
            <ButtonIcon imgStyle={{}} src={openIcon} alt={"Открыть"} title={"Открыть"}
                onClick={() => { openHandler() }} />
        }
        {!isCanEdit ? null :
            <ButtonIcon src={editIcon} alt={"Редактировать"} title={"Редактировать"}
                onClick={editHandler} />
        }
        {!isCanEdit || isCanDelete != undefined ? null :
            <ButtonIcon imgStyle={{ filter: "invert(1)" }} src={deleteIcon} alt={"Удалить"} title={"Удалить"}
                onClick={() => {deleteHandler()}} />
        }
        
    </div>)
}