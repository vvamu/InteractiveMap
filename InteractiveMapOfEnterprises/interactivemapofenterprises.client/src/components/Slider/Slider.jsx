import { useEffect, useState } from "react";
import ButtonIcon from "./../Buttons/ButtonIcon";

import classes from "./Slider.module.css";

import backArrowIcon from "./../../assets/icons/back_arrow.svg";
import nextArrowIcon from "./../../assets/icons/next_arrow.svg";

function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={classes.slider}>
      <div
        className={classes.slide}
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>
      <div className={classes.controls}>
        <ButtonIcon onClick={goToPrevious} src={backArrowIcon} />
        <span className={classes.caption}>{slides[currentIndex].caption}</span>
        <ButtonIcon onClick={goToNext} src={nextArrowIcon} />
      </div>
    </div>
  );
}

export default Slider;
