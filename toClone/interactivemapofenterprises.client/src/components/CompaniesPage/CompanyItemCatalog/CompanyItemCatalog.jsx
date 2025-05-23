import ButtonIcon from "../../Common/Buttons/ButtonIcon";
import classes from "./CompanyItemCatalog.module.css";
import authService from "../../../services/authService";
import { useState,useEffect } from "react";

const openIcon = "/open.svg";
const editIcon = "/edit.svg";
const deleteIcon = "/delete.svg";

function CompanyItemCatalog({ data, onOpen, onEdit, onDelete }) {

    const [curUser, setCurUser] = useState(null);
    useEffect(() => {

        async function getUser() {
            await authService.getCurrentUser().then((data) => {
                setCurUser(data);
            })
        }
        getUser();
    })

  return (
    <li className={classes.item}>
      <div >
              <p className={classes.name}>{data.name}</p>
              <p style={{fontSize:"15px"}}>{data.category}</p>
      </div>
      <div className={classes.tools}>
              <ButtonIcon imgStyle={{ filter: "invert(1)"}} src={openIcon} alt={"Открыть"} onClick={onOpen} />
              {/* <ButtonIcon src={editIcon} alt={"Редактировать"} onClick={onEdit} /> */}

              {curUser?.roles != "Administrator" ? null : <ButtonIcon imgStyle={{ filter: "invert(1)" }} src={deleteIcon} alt={"Удалить"} onClick={onDelete} />}
             
      </div>
    </li>
  );
}

export default CompanyItemCatalog;
