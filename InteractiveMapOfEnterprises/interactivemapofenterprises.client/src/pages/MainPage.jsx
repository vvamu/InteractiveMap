import Slider from "../components/common/Slider/Slider";
import companiesService from "../services/companiesService";
import { useState, useEffect } from "react";
import MainPageSlider from "../components/MainPage/MainPageSlider"
import SectionOne from "../components/MainPage/SectionOne"
import NewGame from "../script"
function MainPage() {
    const countElementByPage = 20;
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [companies, setCompanies] = useState({ content: [] });


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
        <main style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <script type="text/javascript" src="script.js"></script>
            
            <MainPageSlider />
            <SectionOne />
            {/*<button onClick={NewGame} >START</button>*/}
            {/*<div id="game" ></div>*/}

            {/*<div style={{ marginTop: "50px", height: "500px", width: "100%", backgroundColor: "#ffdc9b" }}></div>*/}
        </main>
    );
}

export default MainPage;