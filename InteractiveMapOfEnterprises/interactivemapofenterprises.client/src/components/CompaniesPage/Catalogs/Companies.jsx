import companiesService from "../../../services/companiesService";

import { useEffect, useState } from "react";
import classes from "./Companies.module.css";

import CatalogPages from "./CatalogPages";
import CompanyItemCatalog from "../CompanyItemCatalog/CompanyItemCatalog";
import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox";
import LoaderBox from "../../common/InfoBoxs/LoaderBox";


function CatalogCompanies() {
  const COUNT_ELEM = 10;

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [isActiveActionConfirmation, setIsActiveActionConfirmation] =
    useState(false);
  const [messageActionConfirmation, setMessageActionConfirmation] =
    useState(undefined);
  const [
    currentOperationActionConfirmation,
    setCurrentOperationActionConfirmation,
  ] = useState(undefined);

  const [isActiveLoader, setIsActiveLoader] = useState(false);
  const [messageLoader, setMessageLoader] = useState(undefined);

  useEffect(() => {
    onActiveLoader("Загрузка...");
    companiesService.getTotalPages(COUNT_ELEM).then((data) => {
      setTotalPages(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

  useEffect(() => {
    companiesService.getPage(currentPage, COUNT_ELEM).then((data) => {
      setCompanies(data);
      setTimeout(() => onCloseLoader(), 1000);
    });
  }, [currentPage]);

  const handleOpen = (id, name) => document.location = `/company?id=${id}`;

    const handleEdit = (id, name) => document.location = `/editor?id=${id}`;

  const handleDelete = (id, name) =>
    onActiveActionConfirmationBox(`Вы уверины что хотите удалить "${name}"?`, {
      operation: () => {
        onActiveLoader(`Удаление "${name}"`);
        companiesService.delete(id).then(() => {
          location.reload();
        });
      },
    });

  const handleConfirm = () => {
    currentOperationActionConfirmation.operation();
    onCloseActionConfirmationBox();
  };

  const hadnleCancel = () => onCloseActionConfirmationBox();

  const onActiveActionConfirmationBox = (message, operation) => {
    setIsActiveActionConfirmation(true);
    setMessageActionConfirmation(message);
    setCurrentOperationActionConfirmation(operation);
  };

  const onCloseActionConfirmationBox = () => {
    setIsActiveActionConfirmation(false);
    setMessageActionConfirmation(undefined);
    setCurrentOperationActionConfirmation(undefined);
  };

  const onActiveLoader = (message) => {
    setIsActiveLoader(true);
    setMessageLoader(message);
  };

  const onCloseLoader = () => {
    setIsActiveLoader(false);
    setMessageLoader(undefined);
  };

  return (
      <CatalogPages
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(value) => setCurrentPage(value)}
    >
      {companies.map((compony, index) => (
        <CompanyItemCatalog
          key={index}
          data={compony}
              onOpen={() =>
                  handleOpen(compony.id, compony.addName ? compony.addName : compony.name)}
              onEdit={() =>
                  handleEdit(compony.id, compony.addName ? compony.addName : compony.name)}
              onDelete={() =>
                  handleDelete(compony.id, compony.addName ? compony.addName : compony.name)}
        />
      ))}
      <ActionConfirmationBox
        title={"Подтверждение"}
        message={messageActionConfirmation}
        active={isActiveActionConfirmation}
        onCancel={hadnleCancel}
        onConfirm={handleConfirm}
      />
      <LoaderBox active={isActiveLoader}>
        <p className={classes.messageLoader}>{messageLoader}</p>
      </LoaderBox>
    </CatalogPages>
  );
}

export default CatalogCompanies;
