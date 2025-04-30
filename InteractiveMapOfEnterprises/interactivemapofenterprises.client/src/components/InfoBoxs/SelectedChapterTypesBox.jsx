import { useState } from "react";

import InfoBox from "./InfoBox";
import List from "../Lists/List";
import Title from "../Title";
import ButtonIcon from "../Buttons/ButtonIcon";

import { TYPE_LIST, TYPE_CHAPTER } from "../../constants/constants";

import classes from "./InfoBox.module.css";

import closeIcon from "./../../assets/icons/close.svg";
import checkIcon from "./../../assets/icons/check.svg";

function SelectedChapterTypesBox({ active, onClose, onEndSelected }) {
  const [selectedChapterTypes, setSelectedChapterTypes] = useState([]);

  const handleCheck = (isCheck, chapter) => {
    isCheck ? addChapter(chapter) : removeChapter(chapter);
  };

  const addChapter = (chapter) => {
    setSelectedChapterTypes([...selectedChapterTypes, chapter]);
  };

  const removeChapter = (chapter) => {
    const updateSelectedChapterTypes = [...selectedChapterTypes];
    let index = updateSelectedChapterTypes.findIndex(
      (c) => c.key === chapter.key
    );

    if (index !== -1) {
      updateSelectedChapterTypes.splice(index, 1);
    }

    setSelectedChapterTypes(updateSelectedChapterTypes);
  };

  return (
    <InfoBox active={active}>
      <Title className={classes.title} level={3}>
        Разделы:
      </Title>
      <List className={classes.chapters} type={TYPE_LIST.vertical}>
        {Object.keys(TYPE_CHAPTER).map((key) => {
          const chapter = TYPE_CHAPTER[key];

          return chapter.isVisible ? (
            <li key={key}>
              <input
                type="checkbox"
                onClick={(evt) => handleCheck(evt.target.checked, chapter)}
              />
              <label>{chapter.name}</label>
            </li>
          ) : null;
        })}
      </List>
      <div className={classes.controls}>
        <ButtonIcon src={closeIcon} alt={"Закрыть"} onClick={onClose} />
        <ButtonIcon
          src={checkIcon}
          alt={"Подтвердить"}
          onClick={() => {
            const notVisable = [];
            Object.keys(TYPE_CHAPTER).forEach((key) => {
              if (!TYPE_CHAPTER[key].isVisible) {
                notVisable.push(TYPE_CHAPTER[key]);
              }
            });
            onEndSelected([...notVisable, ...selectedChapterTypes]);
          }}
        />
      </div>
    </InfoBox>
  );
}

export default SelectedChapterTypesBox;
