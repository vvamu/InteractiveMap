import { useState, useEffect } from "react";




import { ERRORS, WARNINGS } from "../../../constants/constants";
import companiesService from "../../../services/companiesService";
import ApplicationUrl from "../../../models/ApplicationUrl";
import authService from "../../../services/authService";
import CompanyCategories from "../../../models/CompanyCategories";
import MinimalInfoAboutCompanyStepForm from "./MinimalInfoAboutCompanyStepForm"


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
          { value: new Date(2023, 8, 10).toLocaleDateString("de-DE") , isRequired: true },
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

        if (!prevData.dateFoundation.value) {
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
            await createCompany(newData);
            
        }
    };


    async function createCompany(newData) {
        try {
            let data = await companiesService.create(newData);
 
                if (!data) {
                    let resUrl = ApplicationUrl.User.app.get + currentUser?.id
                    handleReturn == null ? document.location = resUrl : document.location = resUrl

                }
                let resUrl = ApplicationUrl.Company.app.get + data.id
                handleReturn == null ? document.location = resUrl : document.location = resUrl
            
        }
        catch (ex) {
            let err = [ { message: ex?.message ?? ex }];
            setErrors(err);
        }
    }

    const handleCloseErrorModal = () => {
        setIsActiveErrorModal(false);
        setIsActiveWarningModal(warnings.length > 0);
    };

    const handleCloseWarningModal = () => {
        setIsActiveWarningModal(false);
    };


    function onCancelStep (){
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrlParam = urlParams.get('returnUrl');
        document.location = `${ApplicationUrl.Company.app.get}${company.id}`
        //document.location = `${ApplicationUrl.User.app.get}${company.creatorId}`
    }

    return (
        <MinimalInfoAboutCompanyStepForm handleNext={handleNext} onCancelStep={onCancelStep} errors={errors} warnings={warnings}
            isActiveErrorModal={isActiveErrorModal} prevData={prevData} isActiveWarningModal={isActiveWarningModal}
            selectedMapCity={selectedMapCity} selectedImage={selectedImage} selectedIcon={selectedIcon}
            isActiveInputMap={isActiveInputMap}
            handleCloseWarningModal={handleCloseWarningModal} handleCloseErrorModal={handleCloseErrorModal} handleChangeInput={handleChangeInput}
            setIsActiveInputMap={setIsActiveInputMap} setSelectedImage={setSelectedImage} handleChangeImage={handleChangeImage}
            setSelectedIcon={ setSelectedIcon} handleChangeIcon={ handleChangeIcon}        />
      
  );
}

export default MinimalInfoAboutComponyStep;
