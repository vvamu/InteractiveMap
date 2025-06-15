import { useState, useEffect } from "react";


import Step from "./Step";

import WarningBox from "../../common/InfoBoxs/WarningBox";
import ErrorBox from "../../common/InfoBoxs/ErrorBox";
import InputPosition from "../InputPosition/InputPosition";
import ListErrors from "../../common/Lists/ListErorrs";
import ListWarnings from "../../common/Lists/ListWarnings";
import AutoResizeTextArea from "../AutoResizeTextArea";
import CompanyCategories from "../../../models/CompanyCategories";
import ContentWithBluredBackground from "../../common/ContentWithBluredBackground";
import FormContent from "../../common/FormContent";
import ContentWithPaddings from "../../common/ContentWithPaddings";

import { ERRORS, WARNINGS } from "../../../constants/constants";
import companiesService from "../../../services/companiesService";
import ApplicationUrl from "../../../models/ApplicationUrl";
import authService from "../../../services/authService";
import Input from "../../common/Input/Input";
import createCompany from "./toDel/createCompany";
import handleCreate from "./toDel/handleCreate";


function MinimalInfoAboutComponyStep({ handleReturn, company }) {
  const [warnings, setWarnings] = useState([]);
  const [isActiveWarningModal, setIsActiveWarningModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isActiveErrorModal, setIsActiveErrorModal] = useState(false);
  const [isIgnoreWarning, setIsIgnoreWarning] = useState(false);
  const [isActiveInputMap, setIsActiveInputMap] = useState(false);
  const [selectedMapCity, setSelectedMapCity] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Максимум 10мб");
  const [selectedImage, setSelectedImage] = useState("Максимум 10мб");
  const [currentUser,  setCurrentUser] = useState(null)
    useEffect(() => {
        async function getCurUser() {
            try {
                var res = await authService.getCurrentUser();
                setCurrentUser(res);
                let loca = document.location.pathname
            }
            catch (ex) {
                console.log(ex)
            }
        }
        getCurUser();
    },[])

  const [prevData, setPrevData] = useState({
      id: {value: ""},
      name:
          { value: "", isRequired: true, },
      description:
          { value: "", isRequired: false, },
      dateFoundation:
          { value: new Date('0001-01-01').toLocaleDateString('en-CA') , isRequired: true },
      category:
          { value: CompanyCategories[0], isRequired: true },
      iconFormFile:
          { value: undefined, isRequired: false, path: undefined, accept: "image/png", },
      imageFormFile: 
          { value: undefined, isRequired: false, path: undefined, accept: "image/png", },
      regionId:
          { value: undefined, isRequired: true, },
      position:
          { value: undefined, isRequired: true, },
      uri:
          { value: "", isRequired: false, },
      
  });

    useEffect(() => {
        if (company) {

            setPrevData(prevData => ({
                ...prevData,
                id: { value: company.id },
                name: { value: company.name, isRequired: true },
                description: { value: company.description, isRequired: false },
                dateFoundation: { value: company.dateFoundation.substring(0, 10), isRequired: true },
                category: { value: company.category, isRequired: true },
                regionId: { value: company.regionId, isRequired: true },
                position: { value: { lat: company.latitude, lng: company.altitude }, isRequired: true },
                uri: { value: company.uri, isRequired: false },
                imageFormFile: { value: company.imageBytes, isRequired: false },
                iconFormFile: { value: company.iconBytes, isRequired: false },

            }));

            setSelectedMapCity(company.regionId);
            //setSelectedImage(e.target.value); handleChangeImage(e)
            
        }
    }, [company]);

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

    const handleChangePosition = (regionId, value) => {
        setValueByKey("regionId", regionId);
        setValueByKey("position", value);
    };

    const setValueByKey = (key, value) => {
        const newPrevData = { ...prevData };
        newPrevData[key].value = value;
        setPrevData(newPrevData);
    };
    //---------------END Change Input Value

    //---------------CONFIRM EDIT OR CREATE
    const handleNext = async () => {
        
        const newErrors = [];
        const newWarnings = [];

        if (!currentUser) {
            newErrors.push({ message: "Пользователь не авторизован." });
            setErrors([...newErrors]); return;
        }

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

        if (!prevData.dateFoundation.value || prevData.dateFoundation.value == '0001-01-01') {
          newErrors.push(ERRORS.NOT_VALUE_FOUNDATION_DATE);
          }

          let uri = prevData.uri.value;
          if (uri?.length > 0 && !(uri?.startsWith("https://") || uri?.startsWith("http://") )) {
              newErrors.push(ERRORS.NOT_VALID_uri);
          }


        if (!prevData?.logouri?.value || !prevData?.imageFormFile?.value) {
          //newErrors.push(ERRORS.NOT_SELECTED_LOGO);
        } else {
            const extension = prevData?.logouri?.path?.split(".").pop();
            if (extension != null && extension != "png") {
                newErrors.push(ERRORS.NOT_CORRECT_EXTENSION_LOGO);
            
            }
            const extension2 = prevData?.imageFormFile?.path?.split(".").pop();
            if (extension2 && extension2 != "png") {
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
            const newData = {}; //toFixData
            for (let key in prevData) {
                newData[key] = prevData[key].value;
            }
            await createCompany({newData, setErrors, handleReturn });
            
        }
    };

   

    //async function createCompany(newData) {
    //    try {
    //        let data = await companiesService.create(newData);
 
    //            if (!data) {
    //                let resUrl = ApplicationUrl.User.app.get + currentUser?.id
    //                handleReturn == null ? document.location = resUrl : document.location = resUrl

    //            }
    //            let resUrl = ApplicationUrl.Company.app.get + data.id
    //            handleReturn == null ? document.location = resUrl : document.location = resUrl
            
    //    }
    //    catch (ex) {
    //        let err = [ { message: ex?.message ?? ex }];
    //        setErrors(err);
    //    }
    //}

    const handleCloseErrorModal = () => {
        setIsActiveErrorModal(false);
        setIsActiveWarningModal(warnings.length > 0);
    };

    const handleCloseWarningModal = () => {
        setIsActiveWarningModal(false);
        setIsIgnoreWarning(true);
    };


    function onCancelStep (){
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrlParam = urlParams.get('returnUrl');
        let res = handleReturn ?? returnUrlParam ?? `${ApplicationUrl.User.app.get}${currentUser?.id}` ?? `${ApplicationUrl.Company.app.get}${company?.id}`;
        document.location = res;
        //document.location = `${ApplicationUrl.User.app.get}${company.creatorId}`
    }

    return (
      <>
            <ContentWithPaddings style={{ padding: "0%" }} >
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
                <div style={{ padding: "5% 10%", backgroundImage: "url(/companiesBackgrounds/belneftehim.jpg)" }} >
                    <div style={{ backdropFilter: "contrast(0.8) blur(3px)", backgroundColor: "rgb(255 255 255 / 70%)", padding: "5% 10%", backgroundRepeat: "no-repeat", zoom: "80%" }}>
                        <h2 style={{ margin: "50px 0px" }}> Заполнение информации об предприятии</h2>
                        <Step onNext={handleNext} onCancel={() => { onCancelStep() }} >
                            {/*<Title className="step-title" level={2}>*/}
                            {/*  Краткая ифнормация*/}
                            {/*</Title>*/}
                            <ListErrors errors={errors} />
                            <ListWarnings warnings={warnings} />
                            {/*{warnings.length <= 0 ? null : */}
                            {/*    <div style={{ display: "flex", justifyContent: "space-between" ,margin:"10px 0px" }}>*/}
                            {/*        <label style={{whiteSpace="nowrap"}}>Игнорировать предупреждения?</label>*/}
                            {/*        <input type="checkbox" onClick={(evt) => setIsIgnoreWarning(evt.target.checked)}/>*/}
                            {/*    </div>*/}
                            {/*}*/}
                            <form>

                                <input type="hidden" name="id" value={prevData.id.value} />
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
                                    name={"dateFoundation"}
                                    label={"Дата основания"}
                                    Classes=""
                                    value={prevData.dateFoundation.value}
                                    isRequired={prevData.dateFoundation.isRequired}
                                    onChange={handleChangeInput}

                                />
                                {/*em="Если известен только год основания, выстовите дату в формате 01.01.<год_основания>"*/}

                                {!CompanyCategories ? null :
                                    <div style={{ marginBottom: "10px", width: "100%" }}>
                                        <Input type="hidden" label={"Основное направление деятельности"} isRequired={prevData.category.isRequired} />
                                        <div className="styled-select" style={{ marginBottom: "10px", width: "97%", backgroundColor: "white" }}>
                                            <select name={"category"} onChange={handleChangeInput} value={prevData.category.value} style={{}} >
                                                {CompanyCategories.map(category => (
                                                    <option key={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                }

                                <div>
                                    <div style={{ fontSize: "14px", marginBottom: "5px" }}>Местоположение:
                                        {selectedMapCity != "" ? (<span>☑</span>) : (<span> ☐ </span>)}
                                        {"  " + selectedMapCity}
                                    </div>
                                    <label className={"input-file"}>
                                        <button type="button" name="iconFormFile" onClick={() => setIsActiveInputMap(true)} isRequired={prevData.position.isRequired}>
                                            Выберите позицию
                                        </button>
                                    </label>
                                </div>

                                <div style={{ marginBottom: "40px" }}></div>

                                <Input type="text" name={"uri"} label={"Сайт"} Classes="" placeholder="http://www.example.com"
                                    value={prevData.uri.value} isRequired={prevData.uri.isRequired} onChange={handleChangeInput} />


                                <AutoResizeTextArea handleChangeInput={handleChangeInput} prevData={prevData} />




                                {/*<Input type={"hidden"} label={"Информация о предприятии"} isRequired={prevData.description.isRequired} />*/}
                                {/*<textarea placeholder={"ОАО «Минский автомобильный завод» (МАЗ) — управляющая компания холдинга «БЕЛАВТОМАЗ» (бел. Мінскі аўтамабільны завод)"}*/}
                                {/*    name={"description"} value={prevData.description.value} isRequired={prevData.description.isRequired} onChange={handleChangeInput} />*/}




                                <div>
                                    <div style={{ margin: "10px 0px" }}>Выберите изображение</div>
                                    <label className={"input-file"}>
                                        <input type="file" name="imageFormFile" onChange={e => { setSelectedImage(e.target.value); handleChangeImage(e) }} value={prevData.imageFormFile.path} accept={prevData.iconFormFile.accept} />
                                        <span className={"input-file-btn"}>   {prevData.imageFormFile.value != null ? (<span>Выберите файл ☑</span>) : (<span> Выберите.png файл</span>)} </span>
                                        <span className={"input-file-text"}>{selectedImage}</span>
                                    </label>
                                </div>

                                <div>
                                    <div style={{ margin: "10px 0px" }}>Выберите логотип:</div>
                                    <label className={"input-file"}>
                                        <input type="file" name="iconFormFile" onChange={e => { setSelectedIcon(e.target.value); handleChangeIcon(e); }} value={prevData.iconFormFile.path} accept={prevData.imageFormFile.accept} />
                                        <span className={"input-file-btn"}>{prevData.iconFormFile.value ? (<span>Выберите файл ☑</span>) : (<span> Выберите .png файл</span>)}</span>
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


                            {!isActiveInputMap ? null : (

                                <InputPosition
                                    onClick={() => onclick()}
                                    regionId={prevData.regionId.value}
                                    position={prevData.position.value}
                                    onCancel={() => setIsActiveInputMap(false)}
                                    onConfirm={(id, value) => {
                                        setIsActiveInputMap(false);

                                        handleChangePosition(id, value);
                                        setSelectedMapCity(id);
                                    }}
                                />

                            )}
                        </Step>
                    </div>
                </div>
            </ContentWithPaddings>
        </>
      
  );
}

export default MinimalInfoAboutComponyStep;
