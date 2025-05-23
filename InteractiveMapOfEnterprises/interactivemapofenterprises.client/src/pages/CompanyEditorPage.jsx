import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Title from "../components/common/Title";
import FormContent from "../components/common/FormContent"
import StepsProgress from "../components/EditCompanyPage/StepsProgress/StepsProgress";
import MinimalInfoAboutComponyStep from "../components/EditCompanyPage/Steps/MinimalInfoAboutComponyStep";
import LoaderBox from "../components/common/InfoBoxs/LoaderBox";


import companiesService from "../services/companiesService";
import { TYPE_CHAPTER } from "../constants/constants";
import { useParams } from 'react-router-dom';
function CompanyEditorPage({ currentUser }) {

    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [returnUrl, setReturnUrl] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrlParam = urlParams.get('returnUrl');
        if (id) {
            companiesService.get(id).then((data) =>
            {
                setCompany(data)
            });
        }
        setReturnUrl(decodeURIComponent(returnUrlParam));
    }, []);


  const [isActiveLoader, setIsActiveLoader] = useState(false);
  const [messageLoader, setMessageLoader] = useState(undefined);



  //const onActiveLoader = (message) => {
  //  setIsActiveLoader(true);
  //  setMessageLoader(message);
  //};

  //const onCloseLoader = () => {
  //  setIsActiveLoader(false);
  //  setMessageLoader(undefined);
  //};



  return (
      <FormContent backgroundImage={ "url(/createCompany.jpg)"}> 
        <Title className="editor-header__title" level={1}>
          Заполнение информации об предприятии
        </Title>

          <MinimalInfoAboutComponyStep  company={company} currentUser={currentUser} />
      <LoaderBox active={isActiveLoader}>
        <p className="message-loader">{messageLoader}</p>
      </LoaderBox>
    </FormContent>
  );
}

export default CompanyEditorPage;
