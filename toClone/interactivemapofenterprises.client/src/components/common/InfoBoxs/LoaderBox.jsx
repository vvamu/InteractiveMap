import InfoBox from "./InfoBox";
import classes from "./LoaderBox.module.css"

function Loader() {
    return (
        <div className={classes.Loader}>
            {/*<div className={classes.Content}></div>*/}
            <img src="/icons/loader.gif" />
        </div>
    );
}
function LoaderBox({ children, active = false }) {
  return (
    <InfoBox active={active}>
      <Loader />

      <div>{children ?? "Загрузка..."}</div>
    </InfoBox>
  );
}

export default LoaderBox;
