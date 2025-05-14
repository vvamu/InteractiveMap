import InfoBox from "./InfoBox";
import Loader from "../Loader/Loader";

function LoaderBox({ children, active = false }) {
  return (
    <InfoBox active={active}>
      <Loader />
      <div>{children}</div>
    </InfoBox>
  );
}

export default LoaderBox;
