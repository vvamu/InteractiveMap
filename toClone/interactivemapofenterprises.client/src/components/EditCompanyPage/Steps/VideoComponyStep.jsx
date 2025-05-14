import { useState } from "react";

import Step from "./Step";
import Title from "../../common/Title";
import Input from "../../common/Input/Input";
import WarningBox from "../../common/InfoBoxs/WarningBox";
import ErrorBox from "../../common/InfoBoxs/ErrorBox";
import ListErrors from "../../common/Lists/ListErorrs";
import ListWarnings from "../../common/Lists/ListWarnings";

import { ERRORS, WARNINGS } from "../../../constants/constants";

function VideoComponyStep({ onPassed }) {
  const [warnings, setWarnings] = useState([]);
  const [isActiveWarningModal, setIsActiveWarningModal] = useState(false);

  const [errors, setErrors] = useState([]);
  const [isActiveErrorModal, setIsActiveErrorModal] = useState(false);

  const [isIgnoreWarning, setIsIgnoreWarning] = useState(false);

  const [prevData, setPrevData] = useState({
    videoUrl: {
      value: undefined,
      isRequired: true,
      path: undefined,
      accept: "video/mp4",
    },
  });
  const [data, setData] = useState({
    videoUrl: "",
  });

  const setValueByKey = (key, value) => {
    const newPrevData = { ...prevData };

    newPrevData[key].value = value;

    setPrevData(newPrevData);
  };

  const handleChangeFile = (evt) => {
    const newPrevData = { ...prevData };

    newPrevData[evt.target.name].path = evt.target.value;
    newPrevData[evt.target.name].value = evt.target.files[0];

    setPrevData(newPrevData);
  };

  const handleNext = () => {
    const newErrors = [];
    const newWarnings = [];

    if (!prevData.videoUrl.value) {
      newErrors.push(ERRORS.NOT_SELECTED_VIDEO);
    } else {
      const extension = prevData.videoUrl.path.split(".").pop();

      if (extension !== "mp4") {
        newErrors.push(ERRORS.NOT_CORRECT_EXTENSION_VIDEO);
      }

      if ((prevData.videoUrl.value.size / 1024 / 1024).toFixed(2) > 500) {
        newErrors.push(ERRORS.VERY_BIG_SIZE_VIDEO);
      }
    }

    setWarnings(newWarnings);
    setErrors([...newErrors]);

    if (newErrors.length > 0) {
      setIsActiveErrorModal(true);
    } else if (newWarnings.length > 0 && !isIgnoreWarning) {
      setIsActiveWarningModal(true);
    } else {
      toFixData();
    }
  };

  const toFixData = () => {
    const newData = {};

    for (let key in prevData) {
      newData[key] = prevData[key].value;
    }

    setData(newData);
    onPassed(newData);
  };

  const handleCloseErrorModal = () => {
    setIsActiveErrorModal(false);
    setIsActiveWarningModal(warnings.length > 0);
  };

  const handleCloseWarningModal = () => {
    setIsActiveWarningModal(false);
  };

  return (
    <Step onNext={handleNext}>
      <Title className="step-title" level={2}>
        Краткая ифнормация
      </Title>
      <ListErrors errors={errors} />
      <ListWarnings warnings={warnings} />
      {warnings.length > 0 ? (
        <div>
          <input
            type="checkbox"
            onClick={(evt) => setIsIgnoreWarning(evt.target.checked)}
          />
          <label>Игнорировать предупреждения?</label>
        </div>
      ) : null}
      <Input
        type="file"
        name={"videoUrl"}
        label={"Видео"}
        em="Видео в формате mp4 и размером не более 500мб."
        value={prevData.videoUrl.path}
        onChange={handleChangeFile}
        isRequired={prevData.videoUrl.isRequired}
        accept={prevData.videoUrl.accept}
      />
      <WarningBox
        warnings={warnings}
        active={isActiveWarningModal}
        onClose={handleCloseWarningModal}
      />
      <ErrorBox
        errors={errors}
        active={isActiveErrorModal}
        onClose={handleCloseErrorModal}
      />
    </Step>
  );
}

export default VideoComponyStep;
