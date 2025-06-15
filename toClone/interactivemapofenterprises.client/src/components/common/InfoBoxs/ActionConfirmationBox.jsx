import Title from "../Title";
import ButtonIcon from "../Buttons/ButtonIcon";
import InfoBox from "./InfoBox";

import classes from "./InfoBox.module.css";

const closeIcon = "/close.png";
const checkIcon = "/check.png";

function ActionConfirmationBox({
  title,
  message,
  active = false,
  onConfirm,
  onCancel,
}) {
  return (
    <InfoBox active={active}>
      <Title className={classes.title} level={3}>
        {title}
      </Title>
      <p className={classes.message}>{message}</p>
      <div className={classes.controls}>
        <ButtonIcon src={checkIcon} alt={"подтвердить"} onClick={onConfirm} />
              <ButtonIcon src={closeIcon} alt={"отменить"} onClick={onCancel} />
      </div>
    </InfoBox>
  );
}
export default ActionConfirmationBox;
