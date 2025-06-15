import ContentWithPaddings from "../common/ContentWithPaddings"
import FitImage from "../common/FitImage"
import ApplicationUrl from "../../models/ApplicationUrl"
import { Link } from "react-router-dom";
import EmergingDiv from "../common/EmergingDiv";
import games from "./games";

import ContentWithBluredBackground from "../common/ContentWithBluredBackground";
export default function GamePageContent({ children , currentGameIndex ,backgroundImage }) {


    const style = {
        display: "flex",
        alignItems:"center",
        flexDirection: "column",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        maxWidth: "900px",
        backgroundColor: "rgb(255 255 255 / 95%)",
        borderRadius: "10px",
        flex: "0 0 60%",
        width:"100%"
    };

    return (
        <ContentWithBluredBackground backgroundImage={backgroundImage ?? "url(/companiesBackgrounds/belgips.webp)"} duration={5000}>

          
            <div className="flexContent" style={{ flexDirection: "column", alignItems: "flex-start", }}>
                <div className="flexContent" style={{
                    alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "row",
                    flexWrap: "wrap",  width: "100%", borderRadius: "10px"}}>
                    <div style={ style} >          
                        {children}
                    </div>
                    <div className="boxShadow" style={{  borderRadius: "5px", backgroundColor: "rgb(255 255 255 / 90%)" } }>
                        <div style={{ width: "70%", marginBottom: "10px" }}>Игры</div>
                        {games.map((game, index) => (

                            <div onClick={() => { document.location = game.url }} className="cart"  style={{ marginBottom: "10px", padding:"5px 10px" }} >
                                <div className="flexContent" style={{ justifyContent: "flex-start" }}>
                                    <FitImage src={game.src} height="50px" width="50px" style={{ borderRadius: "5px" }} />
                                    <div>{game.name}</div>
                                </div>
                            </div>

                        ))}
                    
                    </div>
                </div>
            <div style={style}>
                <h3>«{games[currentGameIndex]?.name}»</h3>
                <p>
                    {games[currentGameIndex]?.desription}
                    
                </p>
                {/*Игра Мемори более известна под названием Найди пару и представляет собой набор из пар одинаковых карточек.*/}
                {/*<p>*/}
                {/*    Суть игры очень простая.*/}
                {/*    Карточки выкладываются на стол «рубашкой» вверх. Далее игрок открывает две любые карточки*/}
                {/*    и если на них изображены одинаковые рисунки, он переворачивает их, а если изображения разные, то он переворачивает карточки обратно.*/}
                {/*    Когда все карточки окажутся открытыми вы считаетесь победителем.*/}
                {/*</p>*/}
            </div>
                </div>
                
            
        </ContentWithBluredBackground>
    )
}