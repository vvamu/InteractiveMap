import { useEffect, useState } from "react";

import InfoBox from "./InfoBox";
import Title from "../Title";
import ButtonIcon from "../Buttons/ButtonIcon";

import classes from "./InfoBox.module.css";

import errorIcon from "./../../assets/icons/error.svg";
import backIcon from "./../../assets/icons/back_arrow.svg";
import nextIcon from "./../../assets/icons/next_arrow.svg";
import closeIcon from "./../../assets/icons/close.svg";

function ErrorBox({ errors, active = false, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (currentIndex - 1 !== -1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 !== errors.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!active || errors.length === 0) {
    return null;
  }

  return (
    <InfoBox className={classes.warning} active={active}>
      <Title className={classes.title} level={3}>
        <span>
          <img width={42} height={42} src={errorIcon} alt="ошибка" />
        </span>
        Ошибка!
        <p className={classes.counter}>
          <span>{currentIndex + 1}</span>|<span>{errors.length}</span>
        </p>
      </Title>
      <div className={classes.message}>{errors[currentIndex].message}</div>
      <div className={classes.controls}>
        <ButtonIcon
          src={backIcon}
          onClick={handleBack}
          disabled={currentIndex === 0}
        />
        {currentIndex + 1 !== errors.length ? (
          <ButtonIcon
            src={nextIcon}
            onClick={handleNext}
            disabled={currentIndex + 1 === errors.length}
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

export default ErrorBox;
