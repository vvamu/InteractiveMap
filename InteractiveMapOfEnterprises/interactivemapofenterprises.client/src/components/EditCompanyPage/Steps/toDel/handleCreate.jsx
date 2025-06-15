import { ERRORS, WARNINGS } from "../../../../constants/constants";
import createCompany from "./createCompany";





//---------------CONFIRM EDIT OR CREATE
const handleCreate = async ({ currentUser, prevData, setWarnings, setErrors, isIgnoreWarning,
    setIsActiveErrorModal,setIsActiveWarningModal, handleReturn }) => {

    const handleCreateCompany = async () => {
        await createCompany(prevData, setErrors, handleReturn);
    };


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

    if (!prevData.dateFoundation.value || prevData.dateFoundation.value == "") {
        newErrors.push(ERRORS.NOT_VALUE_FOUNDATION_DATE);
    }

    let uri = prevData.uri.value;
    if (uri?.length > 0 && !(uri?.startsWith("https://") || uri?.startsWith("http://"))) {
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
        let newData = {}; //toFixData
        for (let key in prevData) {
            newData[key] = prevData[key].value;
        }
        handleCreateCompany();

    }
};

export default handleCreate;