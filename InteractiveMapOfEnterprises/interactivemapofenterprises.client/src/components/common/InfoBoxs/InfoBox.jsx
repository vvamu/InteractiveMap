import classes from "./InfoBox.module.css";

function InfoBox({ className = "", children, active = false }) {
  return (
    <section
      className={`${classes.InfoBox} ${
        active ? classes.Active : ""
      } ${className}`}
    >
      <div className={`glass-effect ${classes.Modal}`}>{children}</div>
    </section>
  );
}

export default InfoBox;
