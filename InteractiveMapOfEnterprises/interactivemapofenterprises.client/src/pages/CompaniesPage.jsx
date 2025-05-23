import { useState } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import Title from "../components/common/Title";
import ButtonIcon from "../components/common/Buttons/ButtonIcon";
import Companies from "../components/CompaniesPage/Companies/Companies";
import SelectStepsTypeBox from "../components/CompaniesPage/SelectStepsTypeBox/SelectStepsTypeBox";

const createIcon = "/create.svg";

export default function CompaniesPage() {
  const [isActiveSelectedChaptersBox, setIsActiveSelectedChaptersBox] =
    useState(false);

  const handleSelectedChapterTypes = (chapterTypes) => {
    document.location = `/editor?type=create&chapterTypes=${chapterTypes
      .map((c) => c.type)
      .join(",")}`;
    };

    const toCreatePage = () => {
        document.location = `/editor`
    }


  return (
      <ContentWithPaddings>
          <header style={{display:"flex",justifyContent:"space-between",marginBottom:"3%"}}>
            <Title className="catalog__header-title" level={1}>
              Каталог
            </Title>
              {/*<ButtonIcon src={createIcon} alt={"создать"} onClick={() => setIsActiveSelectedChaptersBox(true)} />*/}
              <ButtonIcon src={createIcon} alt={"создать"} onClick={() => toCreatePage()} />

          </header>
          <main className="">
             <Companies />
          </main>
          <footer className="catalog__footer"></footer>
         
              {/*<SelectStepsTypeBox active={isActiveSelectedChaptersBox} onClose={() => setIsActiveSelectedChaptersBox(false)}*/}
              {/*    onEndSelected={handleSelectedChapterTypes} />*/}
      </ContentWithPaddings>
  );
}