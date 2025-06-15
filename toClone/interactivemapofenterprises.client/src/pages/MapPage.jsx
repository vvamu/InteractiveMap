import { useEffect, useRef, useState,useContext } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import Map from "../components/MapPage/Map/Map";
import ButtonIcon from "../components/Common/Buttons/ButtonIcon";
import { backIconSrc } from "./../../config";
import companiesService from "../services/companiesService";
import CompaniesFilters from "../components/CompaniesPage/CompaniesFilters";
import Companies from "../components/CompaniesPage/Companies/Companies";
import LoaderBox from "../components/common/InfoBoxs/LoaderBox"
import UserContext from "../context/UserContext";
import EmergingDiv from "../components/common/EmergingDiv";


function MapPage() {
    const mapRef = useRef();
    const [filters, setFilters] = useState(null);
    const [isRender, setIsRender] = useState(false);
    const [allMarkers, setAllMarkers] = useState([]);
    const [showMarkers, setShowMarkers] = useState([]);
    const [markersLocal, setMarkersLocal] = useState([]);
    const [isActiveLoader, setIsActiveLoader] = useState(true);


    const curUser = useContext(UserContext).user;



    useEffect(() => {

        if (filters?.category != null && filters?.category != "Все") {
            let filteredd = allMarkers?.filter(f => f.category == filters.category)
            setMarkersLocal(filteredd ?? [])
            return;
        }
        setMarkersLocal(allMarkers)

    }, [filters])


    useEffect(() => {
        getCompanies()
    }, [])

    function getCompanies() {
        companiesService.getAll().then((data) => {
            if (!data) return;
            const newMarkers = data.map((item) => {
                let image = !item.iconBytes ? "/qualityMark.png" : `data:image/jpeg;base64,${item.iconBytes}`;

                return {
                    //position: {
                    //    lng: item.altitude,
                    //    lat: item.latitude
                    //},
                    category: item.category,
                    latitude: item.latitude,
                    altitude: item.altitude,
                    name: item.name,
                    icon: image,
                    companyId: item.id

                };
            });
            //console.log(newMarkers)
            //setMarkersLocal(newMarkers);
            let filteredd;
            if (curUser != null) {
                filteredd = newMarkers.sort((a, b) => {
                    // Primary sort: current user's items first
                    const aIsCurrentUser = a.creatorId === curUser.id;
                    const bIsCurrentUser = b.creatorId === curUser.id;

                    if (aIsCurrentUser && !bIsCurrentUser) return -1;
                    if (!aIsCurrentUser && bIsCurrentUser) return 1;

                    // Secondary sort: alphabetical by some property (e.g., name)
                    return a.name.localeCompare(b.name);
                });
            }


            setMarkersLocal(filteredd ?? newMarkers)
            setAllMarkers(filteredd ?? newMarkers)
            setShowMarkers(filteredd ?? newMarkers)
            setIsActiveLoader(false)

            return filteredd ?? newMarkers;
        })
    }

    return (
        <>
            <LoaderBox active={isActiveLoader} />
        <ContentWithPaddings style={{ minHeight: "100%" }} >
          

            <EmergingDiv duration={ 5000} className="flexContent pageHeader" style={{ justifyContent: "space-between", }}>
              <div>
                  <div className="flexContent" style={{ justifyContent: "flex-start" }}>
                      <div>
                          <h3>Компании</h3>
                          <div className="pageStats coloredText">Созданных компаний :{markersLocal.length}</div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gridGap: "20px" }}>
                          {
                              mapRef.current ?
                                  (<>
                                      {mapRef.current.path.length === 0 ? (
                                          ""
                                      ) : (
                                          <div>
                                              <ButtonIcon
                                                  src={backIconSrc}
                                                  alt={"Назад"}
                                                  disabled={isRender}
                                                  onClick={() => mapRef.current.back()}
                                              ></ButtonIcon>
                                          </div>
                                      )}
                                      <h3>{mapRef.current.current.crs.properties.title
                                          ? mapRef.current.current.crs.properties.title : ""}
                                      </h3>

                                  </>)
                                  : null
                          }
                      </div>



                    
                  </div>
              </div>
              <div className="companyFilterOnMapPage" ><CompaniesFilters setFilters={setFilters} /></div>
          </EmergingDiv>

            <EmergingDiv duration={10000} className="flexContent" style={{ alignItems: "flex-start", minHeight:"100%" }}>
            
                <Map
                    filterValue={filters }
                    ref={mapRef}
                    onRenderStart={() => setIsRender(true)}
                    onRenderEnd={() => setIsRender(false)}
                    style={{ borderRadius: "10px", width: "60%", height:"100%",flex:"0 0 50%" }}
                    className={ "boxShadow"}
                    isVisibleRegionBorders={true}
                    markers={markersLocal}
                    
                    />

                    <EmergingDiv duration={10000}  className="flexContent" style={{ overflowY: "scroll", overflowX:"hidden", width: "35%", maxHeight: "800px", height: "100%", padding: "10px" }}>

                        <Companies filters={filters} setCompanies={setShowMarkers} companies={showMarkers} withBtnActions={false} withOpenByItem={true} />
                  
                    </EmergingDiv>
          </EmergingDiv>

          {/*{*/}
          {/*    markersLocal != null ? <LoaderBox active="true" /> : null*/}
          {/*}*/}
          



         
            </ContentWithPaddings>
        </>
  );
}

export default MapPage;
