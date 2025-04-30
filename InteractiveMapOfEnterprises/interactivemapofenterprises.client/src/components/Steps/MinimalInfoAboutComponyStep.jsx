import { useState } from "react";

import Step from "./Step";
import Title from "../Title";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import WarningBox from "../InfoBoxs/WarningBox";
import ErrorBox from "../InfoBoxs/ErrorBox";
import InputPosition from "../Input/InputPosition";
import ListErrors from "../Lists/ListErorrs";
import ListWarnings from "../Lists/ListWarnings";

import { ERRORS, WARNINGS } from "../../constants/constants";

function MinimalInfoAboutComponyStep({ onPassed }) {
  const [warnings, setWarnings] = useState([]);
  const [isActiveWarningModal, setIsActiveWarningModal] = useState(false);

  const [errors, setErrors] = useState([]);
  const [isActiveErrorModal, setIsActiveErrorModal] = useState(false);

  const [isIgnoreWarning, setIsIgnoreWarning] = useState(false);

  const [isActiveInputMap, setIsActiveInputMap] = useState(false);

  const [prevData, setPrevData] = useState({
    name: {
      value: "",
      isRequired: true,
    },
    abbName: {
      value: "",
      isRequired: false,
    },
    foundationDate: {
      value: undefined,
      isRequired: true,
    },
    logoUrl: {
      value: undefined,
      isRequired: true,
      path: undefined,
      accept: "image/png",
    },
    idRegion: {
      value: undefined,
      isRequired: true,
    },
    position: {
      value: undefined,
      isRequired: true,
    },
    qualityMark: {
      value: false,
      isRequired: false,
    },
  });

  const [data, setData] = useState({
    name: "",
    abbName: "",
    foundationDate: "1990.01.01",
    logoUrl: "",
    idRegion: undefined,
    position: { lat: 0, lng: 0 },
    qualityMark: false
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

  const handleChange = (evt) =>
    setValueByKey(evt.target.name, evt.target.value);

  const handleChangePosition = (idRegion, value) => {
    setValueByKey("idRegion", idRegion);
    setValueByKey("position", value);
  };

  const handleNext = () => {
    console.log(prevData)
    const newErrors = [];
    const newWarnings = [];

    if (prevData.name.value.length > 0) {
      if (prevData.name.value.length <= 3) {
        newWarnings.push(WARNINGS.SMALL_NAME);
      }
    } else {
      newErrors.push(ERRORS.NOT_VALUE_NAME);
    }

    if (prevData.abbName.value.length > 0) {
      if (prevData.name.value.length < 3) {
        newWarnings.push(WARNINGS.SMALL_ADD_NAME);
      }
    }

    if (!prevData.foundationDate.value) {
      newErrors.push(ERRORS.NOT_VALUE_FOUNDATION_DATE);
    }

    if (!prevData.logoUrl.value) {
      newErrors.push(ERRORS.NOT_SELECTED_LOGO);
    } else {
      const extension = prevData.logoUrl.path.split(".").pop();

      if (extension !== "png") {
        newErrors.push(ERRORS.NOT_CORRECT_EXTENSION_LOGO);
      }
    }

    if (!prevData.position.value) {
      newErrors.push(ERRORS.NOT_VALUE_POSITION);
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
      <form>
        <Input
          type="text"
          name={"name"}
          label={"Название"}
          value={prevData.name.value}
          isRequired={prevData.name.isRequired}
          onChange={handleChange}
        />
        <Input
          type="text"
          name={"abbName"}
          label={"Сокращенное название"}
          em="Если такое имееться"
          value={prevData.abbName.value}
          isRequired={prevData.abbName.isRequired}
          onChange={handleChange}
        />
        <Input
          type="date"
          name={"foundationDate"}
          label={"Дата основания"}
          em="Если известен только год основания, выстовите дату в формате 01.01.<год_основания>"
          value={prevData.foundationDate.value}
          isRequired={prevData.foundationDate.isRequired}
          onChange={handleChange}
        />
        <Input
          type="file"
          name={"logoUrl"}
          label={"Логотип"}
          em="Логотип должен быть со соотношением строн 1:1. К примеру 128x128. Формат: .png"
          value={prevData.logoUrl.path}
          onChange={handleChangeFile}
          isRequired={prevData.logoUrl.isRequired}
          accept={prevData.logoUrl.accept}
        />
        <Input
          type="checkbox"
          name={"qualityMark"}
          label={"Присутствует знак качества"}
          em=""
          value={prevData.qualityMark.value}
          isRequired={prevData.qualityMark.isRequired}
          onChange={(evt) => setValueByKey(evt.target.name, evt.target.checked)}
        />
        <Button onClick={() => setIsActiveInputMap(true)}>
          Выбрать местоположение
        </Button>
      </form>
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
      {isActiveInputMap ? (
        <InputPosition
          idRegion={prevData.idRegion.value}
          position={prevData.position.value}
          onCancel={() => setIsActiveInputMap(false)}
          onConfirm={(id, value) => {
            setIsActiveInputMap(false);
            handleChangePosition(id, value);
          }}
        />
      ) : null}
    </Step>
  );
}

export default MinimalInfoAboutComponyStep;
