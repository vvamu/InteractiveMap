//import Step from "../Step";
//import Input from "../../../common/Input/Input";
//import WarningBox from "../../../common/InfoBoxs/WarningBox";
//import ErrorBox from "../../../common/InfoBoxs/ErrorBox";
//import InputPosition from "../../InputPosition/InputPosition";
//import ListErrors from "../../../common/Lists/ListErorrs";
//import ListWarnings from "../../../common/Lists/ListWarnings";
//import AutoResizeTextArea from "../../AutoResizeTextArea";
//import CompanyCategories from "../../../../models/CompanyCategories";
//import ContentWithBluredBackground from "../../../common/ContentWithBluredBackground";
//import FormContent from "../../../common/FormContent";
//import ContentWithPaddings from "../../../common/ContentWithPaddings";

//function MinimalInfoAboutCompanyStepForm({ handleNext, onCancelStep, errors, warnings, isActiveErrorModal,
//    handleCloseErrorModal, prevData,
//    handleChangeInput, isActiveWarningModal, handleCloseWarningModal, handleChangePosition
//   , selectedMapCity, selectedImage, selectedIcon, 
//    setSelectedIcon, handleChangeIcon, setSelectedMapCity, setIsIgnoreWarning
//    ,setIsActiveInputMap, setSelectedImage, handleChangeImage, isActiveInputMap }) {





//    //backgroundImage = { "url(/companiesBackgrounds/belneftehim.jpg)"}
//    return (
//        <>
              
        
//            <ContentWithPaddings style={{ padding: "0%" }} >
//                <WarningBox
//                    warnings={warnings}
//                    active={isActiveWarningModal}
//                    onClose={handleCloseWarningModal}
//                />
//                <ErrorBox
//                    errors={errors}
//                    active={isActiveErrorModal}
//                    onClose={handleCloseErrorModal}
//                />
//            <div style={{ padding: "5% 10%", backgroundImage: "url(/companiesBackgrounds/belneftehim.jpg)" }} >
//                <div style={{ backdropFilter: "contrast(0.8) blur(3px)", backgroundColor: "rgb(255 255 255 / 70%)", padding: "5% 10%", backgroundRepeat: "no-repeat", zoom:"80%" }}>
//                <h2 style={{ margin: "50px 0px" }}> Заполнение информации об предприятии</h2>
//                <Step onNext={handleNext} onCancel={() => { onCancelStep() }} >
//                    {/*<Title className="step-title" level={2}>*/}
//                    {/*  Краткая ифнормация*/}
//                    {/*</Title>*/}
//                    <ListErrors errors={errors} />
//                    <ListWarnings warnings={warnings} />
//                    {/*{warnings.length <= 0 ? null : */}
//                    {/*    <div style={{ display: "flex", justifyContent: "space-between" ,margin:"10px 0px" }}>*/}
//                    {/*        <label style={{whiteSpace="nowrap"}}>Игнорировать предупреждения?</label>*/}
//                    {/*        <input type="checkbox" onClick={(evt) => setIsIgnoreWarning(evt.target.checked)}/>*/}
//                    {/*    </div>*/}
//                    {/*}*/}
//                    <form>

//                        <input type="hidden" name="id" value={prevData.id.value} />
//                        <Input
//                            type="text"
//                            name={"name"}
//                            label={"Название"}
//                            Classes=""
//                            value={prevData.name.value}
//                            isRequired={prevData.name.isRequired}
//                            onChange={handleChangeInput}
//                        />


//                        <Input
//                            type="date"
//                            name={"dateFoundation"}
//                            label={"Дата основания"}
//                            Classes=""
//                            value={prevData.dateFoundation.value}
//                            isRequired={prevData.dateFoundation.isRequired}
//                            onChange={handleChangeInput}

//                        />
//                        {/*em="Если известен только год основания, выстовите дату в формате 01.01.<год_основания>"*/}

//                        {!CompanyCategories ? null :
//                            <div style={{ marginBottom: "10px", width: "100%" }}>
//                                <Input type="hidden" label={"Основное направление деятельности"} isRequired={prevData.category.isRequired} />
//                                <div className="styled-select" style={{ marginBottom: "10px", width: "97%", backgroundColor: "white" }}>
//                                    <select name={"category"} onChange={handleChangeInput} value={prevData.category.value} style={{}} >
//                                        {CompanyCategories.map(category => (
//                                            <option key={category}>{category}</option>
//                                        ))}
//                                    </select>
//                                </div>
//                            </div>
//                        }

//                        <div>
//                            <div style={{  fontSize: "14px", marginBottom: "5px" }}>Местоположение:
//                                {selectedMapCity != "" ? (<span>☑</span>) : (<span> ☐ </span>)}
//                                {"  " + selectedMapCity}
//                            </div>
//                            <label className={"input-file"}>
//                                <button type="button" name="iconFormFile" onClick={() => setIsActiveInputMap(true)} isRequired={prevData.position.isRequired}>
//                                    Выберите позицию
//                                </button>
//                            </label>
//                        </div>

//                        <div style={{ marginBottom: "40px" }}></div>

//                        <Input type="text" name={"uri"} label={"Сайт"} Classes="" placeholder="http://www.example.com"
//                            value={prevData.uri.value} isRequired={prevData.uri.isRequired} onChange={handleChangeInput} />


//                        <AutoResizeTextArea handleChangeInput={handleChangeInput} prevData={prevData} />




//                        {/*<Input type={"hidden"} label={"Информация о предприятии"} isRequired={prevData.description.isRequired} />*/}
//                        {/*<textarea placeholder={"ОАО «Минский автомобильный завод» (МАЗ) — управляющая компания холдинга «БЕЛАВТОМАЗ» (бел. Мінскі аўтамабільны завод)"}*/}
//                        {/*    name={"description"} value={prevData.description.value} isRequired={prevData.description.isRequired} onChange={handleChangeInput} />*/}




//                        <div>
//                            <div style={{    margin: "10px 0px" }}>Выберите изображение</div>
//                            <label className={"input-file"}>
//                                <input type="file" name="imageFormFile" onChange={e => { setSelectedImage(e.target.value); handleChangeImage(e) }} value={prevData.imageFormFile.path} accept={prevData.iconFormFile.accept} />
//                                <span className={"input-file-btn"}>   {prevData.imageFormFile.value != null ? (<span>Выберите файл ☑</span>) : (<span> Выберите.png файл</span>)} </span>
//                                <span className={"input-file-text"}>{selectedImage}</span>
//                            </label>
//                        </div>

//                        <div>
//                                <div style={{ margin: "10px 0px" }}>Выберите логотип:</div>
//                            <label className={"input-file"}>
//                                <input type="file" name="iconFormFile" onChange={e => { setSelectedIcon(e.target.value); handleChangeIcon(e); }} value={prevData.iconFormFile.path} accept={prevData.imageFormFile.accept} />
//                                <span className={"input-file-btn"}>{prevData.iconFormFile.value ? (<span>Выберите файл ☑</span>) : (<span> Выберите .png файл</span>)}</span>
//                                <span className={"input-file-text"}>{selectedIcon}</span>
//                            </label>
//                        </div>


//                        {/*  <Input*/}

//                        {/*    type="file"*/}
//                        {/*    Classes="fileUploader"*/}
//                        {/*    name={"iconFormFile"}*/}
//                        {/*    label={"Логотип"}*/}
//                        {/*    value={prevData.iconFormFile.path}*/}
//                        {/*    onChange={handleChangeFile}*/}
//                        {/*    isRequired={prevData.iconFormFile.isRequired}*/}
//                        {/*                accept={prevData.iconFormFile.accept} />*/}




//                        {/*    <Input*/}
//                        {/*        type="file"*/}
//                        {/*        Classes="fileUploader"*/}
//                        {/*        name={"imageFormFile"}*/}
//                        {/*        label={"Изображение"}*/}
//                        {/*        value={prevData.imageFormFile.path}*/}
//                        {/*        onChange={handleChangeImage}*/}
//                        {/*        isRequired={prevData.imageFormFile.isRequired}*/}
//                        {/*        accept={prevData.imageFormFile.accept}*/}

//                        {/*    />*/}




//                    </form>
                  

//                    {!isActiveInputMap ? null : (

//                        <InputPosition
//                            onClick={() => onclick()}
//                            regionId={prevData.regionId.value}
//                            position={prevData.position.value}
//                            onCancel={() => setIsActiveInputMap(false)}
//                            onConfirm={(id, value) => {
//                                setIsActiveInputMap(false);

//                                handleChangePosition(id, value);
//                                setSelectedMapCity(id);
//                            }}
//                        />

//                    )}
//                    </Step>
//                </div>
//            </div>
//            </ContentWithPaddings>
//        </>
//    );
//}

//export default MinimalInfoAboutCompanyStepForm;
