import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LoaderBox from "./../components/common/InfoBoxs/LoaderBox";

import companiesService from "../services/companiesService";
import CompanyInfo from "../components/CompanyPage/CompanyInfo";
import { useParams } from 'react-router-dom';
function CompanyPage() {
    const { id } = useParams();

  const [isActiveLoader, setIsActiveLoader] = useState(false);
  const [data, setData] = useState(undefined);

  const onActiveLoader = (message) => {
    setIsActiveLoader(true);
  };

  const onCloseLoader = () => {
    setIsActiveLoader(false);
  };

  useEffect(() => {
    onActiveLoader();
    companiesService.get(id).then((result) => {
      setData(result);
      onCloseLoader();
    });
  }, []);

  return (
    <div>
     <CompanyInfo data={data} />
        
      <LoaderBox active={isActiveLoader}>
        <p className="message-loader"></p>
      </LoaderBox>
    </div>
  );
}

export default CompanyPage;
