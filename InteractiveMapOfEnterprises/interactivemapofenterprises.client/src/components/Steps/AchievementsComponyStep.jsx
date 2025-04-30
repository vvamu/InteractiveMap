import { useState } from "react";

import Step from "./Step";
import Title from "../Title";
import Input from "../Input/Input";
import WarningBox from "../InfoBoxs/WarningBox";
import ErrorBox from "../InfoBoxs/ErrorBox";
import ListErrors from "../Lists/ListErorrs";
import ListWarnings from "../Lists/ListWarnings";
import ButtonIcon from "../Buttons/ButtonIcon";
import List from "../Lists/List";

import { ERRORS, WARNINGS } from "../../constants/constants";

import createIcon from "./../../assets/icons/create.svg";
import deleteIcon from "./../../assets/icons/delete.svg";

function AchievementsComponyStep({ onPassed }) {
  const [warnings, setWarnings] = useState([]);
  const [isActiveWarningModal, setIsActiveWarningModal] = useState(false);

  const [errors, setErrors] = useState([]);
  const [isActiveErrorModal, setIsActiveErrorModal] = useState(false);

  const [isIgnoreWarning, setIsIgnoreWarning] = useState(false);

  const [text, setText] = useState("");

  const [prevData, setPrevData] = useState({
    achievements: {
      value: [],
      isRequired: true,
    },
  });

  const [data, setData] = useState({
    achievements: {
      value: [],
    },
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

  const handleNext = () => {
    const newErrors = [];
    const newWarnings = [];

    if (prevData.achievements.value.length === 0) {
      newErrors.push(ERRORS.ACHIEVEMENTS_IS_ZERO);
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
      <div className="achievements">
        <Input
          type="text"
          name={"text"}
          label={"Достижение"}
          em="Не более 255 символов"
          value={text}
          maxLength={255}
          onChange={(evt) => setText(evt.target.value)}
          isRequired={true}
        />
        <ButtonIcon
          type="button"
          src={createIcon}
          onClick={() => {
            if (text.length === 0) {
              alert("Достежение не может быть пустым.");
              return;
            }
            setValueByKey("achievements", [
              ...prevData.achievements.value,
              text,
            ]);
            setText("");
          }}
        />
      </div>
      <List>
        {prevData.achievements.value.map((achievement, index) => (
          <li key={index}>
            <span>{achievement}</span>
            <ButtonIcon
              type="button"
              src={deleteIcon}
              onClick={() => {
                const arr = [...prevData.achievements.value];
                arr.splice(index, 1);
                setValueByKey("achievements", [...arr]);
                setText("");
              }}
            />
          </li>
        ))}
      </List>
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

export default AchievementsComponyStep;
