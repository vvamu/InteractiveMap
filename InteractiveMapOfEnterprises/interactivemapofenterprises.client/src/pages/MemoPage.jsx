import React, { useEffect, useState } from 'react';
import Cards from '../components/MemoPage/Cards';
import ContentWithPaddings from '../components/common/ContentWithPaddings';

const MemoPage = () => {
    return (
        <ContentWithPaddings style={{ display: "flex", alignItems: "center", gridGap:"10%"}}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",  }}>
                <h3>«Memory»</h3>
                <p>
                    Игра Мемори более известна под названием Найди пару и представляет собой набор из пар одинаковых карточек.
                </p>
                <p>
                    Суть игры очень простая. Карточки выкладываются на стол «рубашкой» вверх. Далее игрок открывает две любые карточки
                    и если на них изображены одинаковые рисунки, он переворачивает их, а если изображения разные, то он переворачивает карточки обратно.
                    Когда все карточки окажутся открытыми вы считаетесь победителем.    
                </p>
        </div>
            <div style={{ zoom: "70%", paddingLeft:"10%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", } }>
                <Cards  />
            </div>
        </ContentWithPaddings>
    )
}
export default MemoPage;


//const MemoPage = () => {
//    useEffect(() => {
//        const loadExternalScripts = () => {
//            const script1 = document.createElement('script');
//            script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js';
//            script1.integrity = 'sha512-egJ/Y+22P9NQ9aIyVCh0VCOsfydyn8eNmqBy+y2CnJG+fpRIxXMS6jbWP8tVKp0jp+NO5n8WtMUAnNnGoJKi4w==';
//            script1.crossOrigin = 'anonymous';
//            script1.referrerPolicy = 'no-referrer';

//            const script2 = document.createElement('script');
//            script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.js';
//            script2.integrity = 'sha512-uOsadAxj/qq4rCTYfzn0z+JjaUyXL0l4ufDjCS+RKnIllv0JTdY30i8DgWYX4TIQvxH62aVF27BCPcghyCcIHg==';
//            script2.crossOrigin = 'anonymous';
//            script2.referrerPolicy = 'no-referrer';

//            const script3 = document.createElement('script');
//            script3.src = './start.js';

//            document.head.appendChild(script1);
//            document.head.appendChild(script2);
//            document.head.appendChild(script3);
//        };

//        loadExternalScripts();
//    }, []);

//    return (
//        <div>
//            <link rel="stylesheet" type="text/css" href="index.css" />
//            <MemoryGame />
//        </div>
//    );
//}

//export default MemoPage;



//const MemoryGame = () => {
//    const [flipWon, setFlipWon] = useState(parseInt(localStorage.getItem('flip_won')) || 0);
//    const [flipLost, setFlipLost] = useState(parseInt(localStorage.getItem('flip_lost')) || 0);
//    const [flipAbandoned, setFlipAbandoned] = useState(parseInt(localStorage.getItem('flip_abandoned')) || 0);
//    // Add more state variables as needed

//    useEffect(() => {
//        // Your initial localStorage setup and any other initialization logic can be placed here
//    }, []);

//    const setLocalStorage = (key, value) => {
//        localStorage.setItem(key, value);
//    };

//    const increase = (key) => {
//        setLocalStorage(key, parseInt(localStorage.getItem(key)) + 1);
//        if (key === 'flip_won') {
//            setFlipWon(prevCount => prevCount + 1);
//            setFlipAbandoned(prevCount => prevCount - 1);
//        } else if (key === 'flip_lost') {
//            setFlipLost(prevCount => prevCount + 1);
//            setFlipAbandoned(prevCount => prevCount - 1);
//        }
//        // Update other state variables as needed
//    };

//    const decrease = (key) => {
//        setLocalStorage(key, parseInt(localStorage.getItem(key)) - 1);
//        // Update state accordingly
//    };

//    // Add more functions like toTime, updateStats, shuffle, startScreen, etc.

//    return (
//        <div>
//            {/* Your JSX content for the memory game goes here */}
//        </div>
//    );
//};

