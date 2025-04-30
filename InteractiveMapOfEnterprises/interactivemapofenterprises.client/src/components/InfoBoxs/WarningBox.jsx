import { useState } from "react";

import InfoBox from "./InfoBox";
import Title from "../Title";
import ButtonIcon from "../Buttons/ButtonIcon";

import classes from "./InfoBox.module.css";

import warningIcon from "./../../assets/icons/warning.svg";
import backIcon from "./../../assets/icons/back_arrow.svg";
import nextIcon from "./../../assets/icons/next_arrow.svg";
import closeIcon from "./../../assets/icons/close.svg";

function WarningBox({ warnings, active = false, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (currentIndex - 1 !== -1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 !== warnings.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!active || warnings.length === 0) {
    return null;
  }

  return (
    <InfoBox className={classes.warning} active={active}>
      <Title className={classes.title} level={3}>
        <span>
          <img width={42} height={42} src={warningIcon} alt="предупреждение" />
        </span>
        Предупреждение!
        <p className={classes.counter}>
          <span>{currentIndex + 1}</span>|<span>{warnings.length}</span>
        </p>
      </Title>
      <div className={classes.message}>{warnings[currentIndex].message}</div>
      <div className={classes.controls}>
        <ButtonIcon
          src={backIcon}
          onClick={handleBack}
          disabled={currentIndex === 0}
        />
        {currentIndex + 1 !== warnings.length ? (
          <ButtonIcon
            src={nextIcon}
            onClick={handleNext}
            disabled={currentIndex + 1 === warnings.length}
          />
        ) : (
          <ButtonIcon
            src={closeIcon}
            onClick={() => {
              setCurrentIndex(0);
              onClose();
            }}
          />
        )}
      </div>
    </InfoBox>
  );
}

export default WarningBox;
