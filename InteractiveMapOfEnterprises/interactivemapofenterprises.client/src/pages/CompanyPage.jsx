import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LoaderBox from "./../components/InfoBoxs/LoaderBox";

import companiesService from "../services/companiesService";
import Title from "../components/Title";
import Article from "../components/Article/Article";

function CompanyPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
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
      setData(result.data);
      console.log(result.data)
      onCloseLoader();
    });
  }, []);

  return (
    <>
      <header></header>
      <main >
        <Article data={data}/>
      </main>
      <footer></footer>
      <LoaderBox active={isActiveLoader}>
        <p className="message-loader"></p>
      </LoaderBox>
    </>
  );
}

export default CompanyPage;
