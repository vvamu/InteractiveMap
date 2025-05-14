import { useState } from "react";

import Step from "./Step";
import Title from "../../common/Title";
import Input from "../../common/Input/Input";
import Button from "../../common/Buttons/Button";
import WarningBox from "../../common/InfoBoxs/WarningBox";
import ErrorBox from "../../common/InfoBoxs/ErrorBox";
import InputPosition from "../InputPosition/InputPosition";
import ListErrors from "../../common/Lists/ListErorrs";
import ListWarnings from "../../common/Lists/ListWarnings";


import { ERRORS, WARNINGS } from "../../../constants/constants";
import companiesService from "../../../services/companiesService";



function MinimalInfoAboutComponyStep({ onPassed }) {
  const [warnings, setWarnings] = useState([]);
  const [isActiveWarningModal, setIsActiveWarningModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isActiveErrorModal, setIsActiveErrorModal] = useState(false);
  const [isIgnoreWarning, setIsIgnoreWarning] = useState(false);
  const [isActiveInputMap, setIsActiveInputMap] = useState(false);
  const [isSelectedMapPosition, setSelectedMapPosition] = useState(false);
  const [selectedMapCity, setSelectedMapCity] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Максимум 10мб");
  const [selectedImage, setSelectedImage] = useState("Максимум 10мб");


  const categories = [
      "Производство продуктов питания",
      "Машиностроительные предприятия",
      "Химическая промышленность",
      "Легкая промышленность",
      "Металлообработка и металлургия",
      "Деревообработка",
      "Электроника и электротехника",
      "Фармацевтическая промышленность"
  ];

  const [prevData, setPrevData] = useState({
      name:
          { value: "", isRequired: true, },
      description:
          { value: "", isRequired: false, },
      foundationDate:
          { value: new Date(2023, 8, 10).toLocaleDateString("de-DE") , isRequired: true },
      category:
          { value: categories[0], isRequired: true },
      iconFormFile:
          { value: undefined, isRequired: false, path: undefined, accept: "image/png", },
      imageFormFile: 
          { value: undefined, isRequired: false, path: undefined, accept: "image/png", },
      idRegion:
          { value: undefined, isRequired: true, },
      position:
          { value: undefined, isRequired: true, },
      qualityMark:
          { value: false, isRequired: false, },
      url:
          { value: "", isRequired: false, }
  });

    const setValueByKey = (key, value) => {
        const newPrevData = { ...prevData };
        newPrevData[key].value = value;
        setPrevData(newPrevData);
    };

  const [data, setData] = useState({
    name: "",
    description: "",
    foundationDate: new Date(2023, 8, 10),
    iconFormFile: "", imageFormFile: "",
    idRegion: undefined,
    position: { lat: 0, lng: 0 },
    qualityMark: false
  });

    
   //---------------START Change Input Value
    const handleChangeIcon = (evt) => {
        const newPrevData = { ...prevData };

        newPrevData[evt.target.name].path = evt.target.value;
        newPrevData[evt.target.name].value = evt.target.files[0];

        setPrevData(newPrevData);
    };

    const handleChangeImage = (evt) => {
        const newPrevData = { ...prevData };
        newPrevData[evt.target.name].path = evt.target.value;
        newPrevData[evt.target.name].value = evt.target.files[0];
        setPrevData(newPrevData);
    };


    const handleChangeInput = (evt) =>
        setValueByKey(evt.target.name, evt.target.value);

    const handleChangePosition = (idRegion, value) => {
        setValueByKey("idRegion", idRegion);
        setValueByKey("position", value);
    };

    //---------------END Change Input Value

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

    //if (prevData.description.value.length > 0) {
    //  if (prevData.name.value.length < 3) {
    //    newWarnings.push(WARNINGS.SMALL_ADD_NAME);
    //  }
    //}

    if (!prevData.foundationDate.value) {
      newErrors.push(ERRORS.NOT_VALUE_FOUNDATION_DATE);
      }

      let url = prevData.url.value;
      if (url.length > 0 && !(url.startsWith("https://") || url.startsWith("http://") )) {
          newErrors.push(ERRORS.NOT_VALID_URL);
      }

    //if (!prevData.logoUrl.value) {
    //  newErrors.push(ERRORS.NOT_SELECTED_LOGO);
    //} else {
    //    const extension = prevData.logoUrl.path.split(".").pop();
    //    if (!(extension == "png" || extension == "jpg" || extension == "jpeg")) {
    //    newErrors.push(ERRORS.NOT_CORRECT_EXTENSION_LOGO);
    //  }
    //}

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
        const newData = {}; //toFixData
        for (let key in prevData) {
            newData[key] = prevData[key].value;
        }
        setData(newData);
        onOverStept(newData);
    }
    };

    const onOverStept = (updateSteps) => {
      //onActiveLoader("Загрузка данных на сервер");
      companiesService.create(updateSteps).then((isSaved) => {
        document.location = "/catalog";
      });
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
          {/*{warnings.length <= 0 ? null : */}
          {/*    <div style={{ display: "flex", justifyContent: "space-between" ,margin:"10px 0px" }}>*/}
          {/*        <label style={{whiteSpace="nowrap"}}>Игнорировать предупреждения?</label>*/}
          {/*        <input type="checkbox" onClick={(evt) => setIsIgnoreWarning(evt.target.checked)}/>*/}
          {/*    </div>*/}
          {/*}*/}
      <form>
        <Input
          type="text"
          name={"name"}
          label={"Название"}
          Classes=""
          value={prevData.name.value}
          isRequired={prevData.name.isRequired}
          onChange={handleChangeInput}
        />
        

        <Input
          type="date"
          name={"foundationDate"}
          label={"Дата основания"}
          Classes=""
          value={prevData.foundationDate.value}
          isRequired={prevData.foundationDate.isRequired}
          onChange={handleChangeInput}
          placeholder="DD.MM.YYYY"
              />
              {/*em="Если известен только год основания, выстовите дату в формате 01.01.<год_основания>"*/}

        {!categories ? null :
            <div style={{ marginBottom:"10px" }}>
                <Input type="hidden" label={"Основное направление деятельности"} isRequired={prevData.category.isRequired}/>

                <select name={"category"}  onChange={handleChangeInput}  value={prevData.category.value} >
                        {categories.map(category => (
                            <option key={category}>{category}</option>
                        ))}
                </select>
            </div>
        }

        <div>
                  <div style={{ fontFamily: "MA-Bold", fontSize: "14px", marginBottom: "5px" }}>Местоположение:
                      {isSelectedMapPosition ? (<span>☑</span>) : (<span> ☐ </span>)}
                      {"  " +selectedMapCity}
                  </div>
            <label className={"input-file"}>
                <button type="button" name="iconFormFile" onClick={() => setIsActiveInputMap(true)} isRequired={prevData.position.isRequired}>
                    Выберите позицию
                </button>
            </label>
        </div>

       <hr />

        <Input type="text" name={"url"} label={"Сайт"} Classes="" placeholder="http://www.example.com"
          value={prevData.url.value} isRequired={prevData.url.isRequired} onChange={handleChangeInput} />

        <div>
            <Input type={"hidden"} label={"Информация о предприятии"} isRequired={prevData.description.isRequired} />
            <textarea placeholder={"ОАО «Минский автомобильный завод» (МАЗ) — управляющая компания холдинга «БЕЛАВТОМАЗ» (бел. Мінскі аўтамабільны завод)"}
                name={"description"} value={prevData.description.value} isRequired={prevData.description.isRequired} onChange={handleChangeInput} />
        </div>

        

        <div>
            <div style={{ fontFamily: "MA-Bold" ,fontSize:"14px", fontStyle:"normal", marginTop:"10px"}}>Выберите изображение</div>
            <label className={"input-file"}>
                      <input type="file" name="imageFormFile" onChange={e => { setSelectedImage(e.target.value); handleChangeImage(e) }} value={prevData.imageFormFile.path} accept={prevData.iconFormFile.accept} />
                <span className={"input-file-btn"}>Выберите файл</span>
                <span className={"input-file-text"}>{selectedImage}</span>
            </label>
        </div>

        <div>
            <div style={{ fontFamily: "MA-Bold" ,fontSize:"14px"}}>Выберите логотип:</div>
            <label className={"input-file"}>
                      <input type="file" name="iconFormFile" onChange={e => { setSelectedIcon(e.target.value); handleChangeIcon(e); }} value={prevData.iconFormFile.path} accept={prevData.imageFormFile.accept} />
                    <span className={"input-file-btn"}>Выберите файл</span>
                    <span className={"input-file-text"}>{selectedIcon}</span>
            </label>
        </div>

              
              {/*  <Input*/}
        
              {/*    type="file"*/}
              {/*    Classes="fileUploader"*/}
              {/*    name={"iconFormFile"}*/}
              {/*    label={"Логотип"}*/}
              {/*    value={prevData.iconFormFile.path}*/}
              {/*    onChange={handleChangeFile}*/}
              {/*    isRequired={prevData.iconFormFile.isRequired}*/}
              {/*                accept={prevData.iconFormFile.accept} />*/}
                         
           

              
              {/*    <Input*/}
              {/*        type="file"*/}
              {/*        Classes="fileUploader"*/}
              {/*        name={"imageFormFile"}*/}
              {/*        label={"Изображение"}*/}
              {/*        value={prevData.imageFormFile.path}*/}
              {/*        onChange={handleChangeImage}*/}
              {/*        isRequired={prevData.imageFormFile.isRequired}*/}
              {/*        accept={prevData.imageFormFile.accept}*/}

              {/*    />*/}
                 
             

            
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

          {!isActiveInputMap ? null : (
              
          <InputPosition 
              idRegion={prevData.idRegion.value}
              position={prevData.position.value}
              onCancel={() => setIsActiveInputMap(false)}
              onConfirm={(id, value) => {
                  setIsActiveInputMap(false);
                  setSelectedMapPosition(true);
                  handleChangePosition(id, value);
                  setSelectedMapCity(id);
              }}
                  />
         
      )}
    </Step>
  );
}

export default MinimalInfoAboutComponyStep;
