import classes from "./InfoBox.module.css";

function InfoBox({ className = "", children, active = false }) {
  return (
    <div
      className={`${classes.InfoBox} ${
        active ? classes.Active : ""
      } ${className}`}
      >
          <div className={`glass-effect ${classes.Modal}`} style={{ top: "20%", left: "45%", position:"absolute" }}>{children}</div>
    </div>
  );
}

export default InfoBox;
