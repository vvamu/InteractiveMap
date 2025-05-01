import { useState } from "react";

import Title from "../components/common/Title";
import ButtonIcon from "../components/common/Buttons/ButtonIcon";
import CatalogCompanies from "../components/CompaniesPage/Catalogs/Companies";
import SelectedChapterTypesBox from "../components/common/InfoBoxs/SelectedChapterTypesBox";

const createIcon = "/create.svg";

function CatalogPage() {
  const [isActiveSelectedChaptersBox, setIsActiveSelectedChaptersBox] =
    useState(false);

  const handleSelectedChapterTypes = (chapterTypes) => {
    document.location = `/editor?type=create&chapterTypes=${chapterTypes
      .map((c) => c.type)
      .join(",")}`;
  };

  return (
    <>
      <header className="catalog__header">
        <Title className="catalog__header-title" level={1}>
          Каталог
        </Title>
        <ButtonIcon
          src={createIcon}
          alt={"создать"}
          onClick={() => setIsActiveSelectedChaptersBox(true)}
        />
      </header>
      <main className="catalog__main">
        <CatalogCompanies />
      </main>
      <footer className="catalog__footer"></footer>
      <SelectedChapterTypesBox
        active={isActiveSelectedChaptersBox}
        onClose={() => setIsActiveSelectedChaptersBox(false)}
        onEndSelected={handleSelectedChapterTypes}
      />
    </>
  );
}

export default CatalogPage;
