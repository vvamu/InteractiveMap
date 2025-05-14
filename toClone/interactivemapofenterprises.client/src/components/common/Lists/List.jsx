import { TYPE_LIST } from "../../../constants/constants";
import classes from "./List.module.css";

function List({ className = "", type = TYPE_LIST.vertical, children }) {
  return (
    <ul className={`${classes.list} ${classes[type]} ${className}`}>
      {children}
    </ul>
  );
}

export default List;
