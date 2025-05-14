import { useEffect, useState } from "react";
import ButtonIcon from "../../Common/Buttons/ButtonIcon";

import classes from "./Slider.module.css";

import { backIconSrc } from "../../../../config";
import { nextIconSrc } from "../../../../config";

function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {goToNext();}, 5000);
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
        <div className={classes.slider} style={{ width: "100%", height:"100%" }}>
          {
                !slides || slides.length <= 0 ? null :
                  <img className={classes.slide}
                      src={!slides[0].imageBytes ? "/qualityMark.png" : `data:image/png;base64,${slides[0].imageBytes}`}
                  />
          }
      
          {!slides || slides.length < 1 ? null :
              <div className={classes.controls}>
                  <ButtonIcon onClick={goToPrevious} src={backIconSrc}/>
                  <ButtonIcon onClick={goToNext} src={nextIconSrc} />
              </div>
          }
    </div>
  );
}

export default Slider;
