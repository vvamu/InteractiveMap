import classes from "./StepsProgress.module.css";

function StepsProgress({ steps }) {
  return (
    <ul className={classes.steps}>
          {steps.map((step, id) => (
        <li key={id} className={classes.step} style={{ display : "flex"}}>
          <span className={classes.line}></span>
          <div className={`${classes.point} ${classes[step.status]}`}>
            <div>
              <div>{id + 1}</div>
            </div>
          </div>
          <span className={classes.name}>{step.props.name}</span>
          <span className={classes.description}>
            <span>
              {id + 1} - {step.props.name}
            </span>
            {step.props.description}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default StepsProgress;
