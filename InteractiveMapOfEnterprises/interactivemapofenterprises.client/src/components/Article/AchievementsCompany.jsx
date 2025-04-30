import { TYPE_LIST } from "../../constants/constants";
import List from "./../Lists/List";

import classes from "./Article.module.css";

function AchievementsCompany({ props }) {
  return (
    <div className={`${classes.chapter}`}>
      <h2 className={classes.title}>Достежения:</h2>
      <List className={classes.achievements} type={TYPE_LIST.vertical}>
        {props.content.achievements.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </List>
    </div>
  );
}

export default AchievementsCompany;
