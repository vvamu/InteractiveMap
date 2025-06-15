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


  useEffect(() => {
      setIsActiveLoader(true);

      const getItemById = async() => {
          companiesService.get(id).then((result) => {
              if (result == undefined || result == null) {
                  document.location = "/map"
              }
              setData(result);
              setIsActiveLoader(false)
          });
      }


      try {
         getItemById();
      }
      catch (ex) {
          console.log("ex");
      }
  }, []);

  return (
      <>
          <LoaderBox active={isActiveLoader}>
              <p className="message-loader"></p>
          </LoaderBox>
          <CompanyInfo data={data} setIsActiveLoader={(f) => { setIsActiveLoader(f) }} isActiveLoader={isActiveLoader} />
        
     
    </>
  );
}

export default CompanyPage;
