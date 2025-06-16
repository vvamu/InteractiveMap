import companiesService from "../../../services/companiesService";

import { useEffect, useState, useContext } from "react";
import classes from "./Companies.module.css";

import PaginationSetting from "./PaginationSetting";
import CompanyItemCatalog from "../CompanyItemCatalog/CompanyItemCatalog";
import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox";
import LoaderBox from "../../common/InfoBoxs/LoaderBox";
import ApplicationUrl from "../../../models/ApplicationUrl";
import UserContext from "../../../context/UserContext";
import ErrorBox from "../../common/InfoBoxs/ErrorBox";
function Companies({ userId, toAllUsers, filters, companies, setCompanies, setMarkersLocal,
    withBtnActions,
    withOpenByItem, withImage, children }) {
    const COUNT_ELEM = 10;
    const curUser = useContext(UserContext).user;


    const [allCompanies, setAllCompanies] = useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isActiveActionConfirmation, setIsActiveActionConfirmation] = useState(false);
    const [messageActionConfirmation, setMessageActionConfirmation] = useState(undefined);
    const [currentOperationActionConfirmation, setCurrentOperationActionConfirmation] = useState(undefined);

    const [isActiveLoader, setIsActiveLoader] = useState(true);
    const [messageLoader, setMessageLoader] = useState(undefined);
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        onActiveLoader("Загрузка...");
        companiesService.getTotalPages(COUNT_ELEM).then((data) => {
            setTotalPages(data);
        });
        companiesService.getPage(currentPage, COUNT_ELEM).then((data) => {
            //setAllCompanies(data);
            //setCompanies(data);
            let filteredd;
            let allCompanies = data;
            if (filters?.category != null && filters?.category != "Все" && filters?.category != "Собственные") {
                filteredd = data?.filter(f => f.category == filters.category)
            }
            if (filters?.category == "Собственные" || userId != null) {

                let one = data;
                filteredd = data?.filter(f => f.creatorId == userId)
                allCompanies = filteredd;
            }
            
            let passedCompanies = filteredd ?? data;
            let comp = orderItemsByUser(curUser, passedCompanies)
            setCompanies(comp ?? data)
            setAllCompanies(allCompanies);

            setTimeout(() => onCloseLoader(), 1000);
        });

    }, []);

    useEffect(() => {

        let filteredd;
        if (filters?.category == "Собственные" || userId != null) {

            filteredd = allCompanies?.filter(f => f.creatorId == curUser.id)
        }
        else {
            filteredd = allCompanies;
        }

        if (filters?.category != null && filters?.category != "Собственные" && filters?.category != "Все") {
            filteredd = filteredd?.filter(f => f.category == filters.category)
        }
        
        let passedCompanies = filteredd;
        let comp = orderItemsByUser(curUser, passedCompanies)
        setCompanies(comp ?? allCompanies)

    }, [filters])
    function orderItemsByUser(curUser, companies) {

        let comp = companies;
        if (curUser != null) {
            comp = companies.sort((a, b) => {
                // Primary sort: current user's items first
                const aIsCurrentUser = a.creatorId === curUser.id;
                const bIsCurrentUser = b.creatorId === curUser.id;

                if (aIsCurrentUser && !bIsCurrentUser) return -1;
                if (!aIsCurrentUser && bIsCurrentUser) return 1;

                // Secondary sort: alphabetical by some property (e.g., name)
                return a.name.localeCompare(b.name);
            });
        }
        return comp;
    }


  //  useEffect(() => {

  //    if (toAllUsers || userId == null || userId == undefined) {
  //        companiesService.getPage(currentPage, COUNT_ELEM).then((data) => {
  //            setAllCompanies(data);
  //            setCompanies(data);
  //            setTimeout(() => onCloseLoader(), 1000);
  //        });
  //    }
  //    else {
  //        var resData = companiesService.getByUser(userId).then((data) => {
  //            setAllCompanies(data);
  //            setCompanies(data ?? []);
  //            setTimeout(() => onCloseLoader(), 1000);
  //        });
  //    }
      
    
  //}, [currentPage, userId]);

    const handleOpen = (id) =>
        document.location = ApplicationUrl.Company.app.get + id;

    const handleEdit = (id) =>
        document.location = ApplicationUrl.Company.app.edit + id;

    const handleDelete = async (id) => {
         
        try {
            if (!id) {
                return;
            }

            companiesService.deleteAsync(id).then(() => {

                companiesService.getByUser(userId).then((data) => {
                    setCompanies(data ?? []);
                    document.location = ApplicationUrl.User.app.get + userId;
                })

            });

        }
        catch (ex) {
            let ex2 = ex;
            document.location = ApplicationUrl.User.app.get + userId;
        }
        finally {
            var resData = companiesService.getByUser(userId).then((data) => {
                setAllCompanies(data);
                setCompanies(data ?? []);
                setTimeout(() => onCloseLoader(), 1000);
                document.location = ApplicationUrl.User.app.get + userId;
            });

            document.location = ApplicationUrl.User.app.get + userId;
        }
           
    };



    const handleConfirm = () => {
        currentOperationActionConfirmation.operation();
        onCloseActionConfirmationBox();
    };

    const hadnleCancel = () => onCloseActionConfirmationBox();

    const onActiveLoader = (message) => {
        setIsActiveLoader(true);
        setMessageLoader(message);
    };

    const onCloseLoader = () => {
        setIsActiveLoader(false);
        setMessageLoader(undefined);
    };

    return (
        <div style={{ width:"100%" }}>
            {children}

          {!companies || companies.length == 0 ? <div>Ни одной компании не создано</div> : companies.map((compony, index) => (
              <>
                  
                  <ErrorBox
                      errors={errorMessages}
                      active={errorMessages.length > 0}
                      onClose={() => { setErrorMessages([]) }}
                  />


                  <CompanyItemCatalog
                      withImage={withImage }
                      withOpenByItem={withOpenByItem}
                      withBtnActions={withBtnActions}
                      key={index}
                      data={compony}
                      setErrorMessages={setErrorMessages}
                      onOpen={() => {
                          handleOpen(compony.id ?? compony.companyId)
                      } }
                      onEdit={() => {
                          handleEdit(compony.id)
                      }}
                      onDelete={(companyId) => { handleDelete(companyId) }}
                  />
              </>
      ))}
      <ActionConfirmationBox
        title={"Подтверждение"}
        message={messageActionConfirmation}
        active={isActiveActionConfirmation}
        onCancel={hadnleCancel}
        onConfirm={handleConfirm}
          />
          <div style={{ position: "absolute", top:"50%", left:"50%" }}>
        <LoaderBox  active={isActiveLoader}>
            <p className={classes.messageLoader}>{messageLoader}</p>
              </LoaderBox>
          </div>
      </div>
  );
}

export default Companies;
