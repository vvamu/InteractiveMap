import React, { useEffect, useState } from 'react';
import Cards from '../components/MemoPage/Cards';
import ContentWithPaddings from '../components/common/ContentWithPaddings';
import FitImage from '../components/common/FitImage';
import ApplicationUrl from '../models/ApplicationUrl';
import GamePageContent from "../components/GamePage/GamePageContent";

const MemoPage = () => {

    const [isResetClicked, setResetClicked] = useState(false);
    const [isResetVisible, setResetVisible] = useState(false);

    return (
        <GamePageContent currentGameIndex={0}>
            <div >
                <Cards isResetClicked={isResetClicked} setResetVisible={setResetVisible} zoom="57%" />
                {isResetVisible ? <button style={{ width: "100%" }} onClick={() => { setResetClicked(!isResetClicked) }}>Заново</button> : null }
                
            </div>
        </GamePageContent>   
    )
}
export default MemoPage;


//<ContentWithPaddings >
//    <div style={{ display: "flex",  gridGap: "10%" }}>
//        <div style={{
//            zoom: "70%", display: "flex", flexDirection: "column",
//            alignItems: "center", justifyContent: "center",
//        }}>
//            <Cards  />
//        </div>
//        <div style={{ width: "100%" }}>
//            <div>Другие игры</div>
//            <div className="boxShadow" >
//                <div className="cart" onClick={ApplicationUrl.Game.app.get + "puzzle"}>
//                    <FitImage src=""/>
//                </div>
//            </div>
//        </div>
//    </div>
//    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
//        <h3>«Мемори»</h3>
//        <p>
//            Игра Мемори более известна под названием Найди пару и представляет собой набор из пар одинаковых карточек.
//        </p>
//        <p>
//            Суть игры очень простая. Карточки выкладываются на стол «рубашкой» вверх. Далее игрок открывает две любые карточки
//            и если на них изображены одинаковые рисунки, он переворачивает их, а если изображения разные, то он переворачивает карточки обратно.
//            Когда все карточки окажутся открытыми вы считаетесь победителем.
//        </p>
//    </div>
//</ContentWithPaddings>