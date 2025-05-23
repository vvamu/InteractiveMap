import InfoBox from "./InfoBox";
import classes from "./LoaderBox.module.css"

function Loader() {
    return (
        <div className={classes.Loader}>
            <div className={classes.Content}></div>
        </div>
    );
}
function LoaderBox({ children, active = false }) {
  return (
    <InfoBox active={active}>
      <Loader />
      <div>{children}</div>
    </InfoBox>
  );
}

export default LoaderBox;
