import Title from "../Title";
import List from "./List";

import { TYPE_LIST } from "../../../constants/constants";

import classes from "./List.module.css";

function ListDetails({ title, icon, children }) {
  return (
    <details className={classes.listDetails}>
      <summary className={classes.listHeader}>
        <img width={25} height={25} src={icon} alt={title} />
        <Title className={classes.title} level={3}>
          {title}
        </Title>
      </summary>
      <List type={TYPE_LIST.vertical}>{children}</List>
    </details>
  );
}

export default ListDetails;
