import ButtonIcon from "../Buttons/ButtonIcon";

import classes from "./CompanyItemCatalog.module.css";

import openIcon from "./../../assets/icons/open.svg";
import editIcon from "./../../assets/icons/edit.svg";
import deleteIcon from "./../../assets/icons/delete.svg";

function CompanyItemCatalog({ data, onOpen, onEdit, onDelete }) {
  return (
    <li className={classes.item}>
      <div>
        <p className={classes.name}>{data.name}</p>
        <span className={classes.addName}>{data.addName}</span>
      </div>
      <div className={classes.tools}>
        <ButtonIcon src={openIcon} alt={"Открыть"} onClick={onOpen} />
        {/* <ButtonIcon src={editIcon} alt={"Редактировать"} onClick={onEdit} /> */}
        <ButtonIcon src={deleteIcon} alt={"Удалить"} onClick={onDelete} />
      </div>
    </li>
  );
}

export default CompanyItemCatalog;
