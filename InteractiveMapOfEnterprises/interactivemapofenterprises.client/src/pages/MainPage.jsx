import Slider from "../components/common/Slider/Slider";
import companiesService from "../services/companiesService";
import { useState, useEffect } from "react";
import MainPageSlider from "../components/MainPage/MainPageSlider"
import SectionOne from "../components/MainPage/SectionOne"
import NewGame from "../script"

import useLocationChangeLogger from "../hooks/useLocationChangeLogger";
import EmergingDiv from "../components/common/EmergingDiv";



function MainPage() {
    const countElementByPage = 20;
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [companies, setCompanies] = useState({ content: [] });

    useLocationChangeLogger();

    //useEffect(() => {
    //    companiesService.getPage(currentPage, countElementByPage).then((data) => {
    //        const filteredData = data.filter(item => item.imageBytes !== null);
    //        setCompanies({ content: filteredData });
    //    });
    //}, [currentPage]);

    //useEffect(() => {
    //    companiesService.getTotalPages(countElementByPage).then((data) => {
    //        setTotalPages(data);
    //    });
    //}, []);

    //useEffect(() => {
    //    setCurrentPage(1);
    //}, [totalPages]);

    return (
        <>
            
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", height:"100%" }}>
                <MainPageSlider />
            {/*position: "absolute",*/}
            {/*top: "8%",*/}


            {/*<div className="flexContent" style={{*/}
            {/*     zIndex: "20", borderTop: "3px solid rgba(233, 119, 119,0.2)", borderRadius: "10px",*/}
            {/*    padding: "0px", width: "100%", height: "60px", fontSize: "18px", backgroundColor: "rgba(255,255,255,1)"*/}
            {/*}} >*/}
            {/*    <EmergingDiv duration={5000} className="flexContent" style={{ width: "100%", backgroundColor:"white" }}>Основыные компании и бренды Беларуси</EmergingDiv>*/}
            {/*</div>*/}

            
            <EmergingDiv duration={5000}>
                <SectionOne />
            </EmergingDiv>
            
            {/*<button onClick={NewGame} >START</button>*/}
            {/*<div id="game" ></div>*/}

            {/*<div style={{ marginTop: "50px", height: "500px", width: "100%", backgroundColor: "#ffdc9b" }}></div>*/}
            </div>
        </>
    );
}

export default MainPage;