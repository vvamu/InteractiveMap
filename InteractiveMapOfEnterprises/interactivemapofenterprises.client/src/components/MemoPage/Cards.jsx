import { useState ,useEffect,useRef } from 'react';
import Card from './Card';
import companiesService from '../../services/companiesService';

function Cards({ zoom, isResetClicked, setResetVisible }) {

    const [isCompleted, setIsCompleted] = useState(false);
    const emptyIcons = ['/gamesContent/belaz.png',
        '/gamesContent/belwest.png',
        '/gamesContent/kommunarka.png',
        '/gamesContent/maz.png',
        '/gamesContent/milavitsa.png',
        '/gamesContent/milk.png',
        '/gamesContent/redPisch.png',
        '/gamesContent/blink.png']
    const [isSort, setIsSort] = useState(false);

    const [items, setItems] = useState([].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1);
    const [isAlreadyChecking, setIsAlreadyChecking] = useState(false);
    const [timer, setTimer] = useState(0);

    const [intervalId, setIntervalId] = useState();
    let intervalRef = useRef();

    useEffect(() => {
        async function getCompanies() {
            setItems(null);  
            setTimer(0);
            stopTimer();
            var itemsDb = await companiesService.getAll();

            itemsDb = itemsDb.filter(i => i.imageBytes != null).sort(() => Math.random() - 0.5);
            let maxLenght = itemsDb.length > 8 ? 8 : itemsDb.length;

            

            for (var i = 0; i < maxLenght; i++) {
                
                let src = `data:image/png;base64,${itemsDb[i].imageBytes}`;
                let newItem = { id: i, img: src, stat: "", counter: 0 };
                let newItem2 = { id: i, img: src, stat: "", counter: 1 };

                setItems(prevItems => [...prevItems, newItem]);
                setItems(prevItems => [...prevItems, newItem2]);
            }

            if (itemsDb.length < 8) {
                let insertedIcons = emptyIcons.sort(() => Math.random() - 0.5)
                let counter = 0;
                for (var i = itemsDb.length; i < 8; i++) {

                    let newItem = { id: i, img: insertedIcons[counter], stat: "", counter: 0 };
                    let newItem2 = { id: i, img: insertedIcons[counter], stat: "", counter: 1 };

                    setItems(prevItems => [...prevItems, newItem]);
                    setItems(prevItems => [...prevItems, newItem2]);
                    counter++;
                }
            }

            setIsCompleted(true);
        }

        getCompanies();
    }, []);

    useEffect(() => {
        // Shuffle items
        let shuffledItems = [...items].sort(() => Math.random() - 0.5);

        if (shuffledItems.length === 0) {
            let insertedIcons = [...emptyIcons].sort(() => Math.random() - 0.5);
            let newItems = [];

            for (let i = 0; i < 8; i++) {
                let newItem = { id: i * 2, img: insertedIcons[i], stat: "", counter: 0 };
                let newItem2 = { id: i * 2 + 1, img: insertedIcons[i], stat: "", counter: 1 };
                newItems.push(newItem, newItem2);
            }

            shuffledItems = newItems;
        }

        setItems(shuffledItems);
        setIsSort(true);

        if (intervalRef.current) {
            clearInterval(intervalRef.current - 1); // Note: `intervalRef.current - 1` might not be what you intend
        }
    }, [isCompleted, isResetClicked]);

    useEffect(() => {
        resetGame()
        let interval = intervalRef
        clearInterval(intervalRef.current);
        interval = intervalRef

    }, [isResetClicked])

    function startTimer() {
        //let itervalId = setInterval(() => { setTimer(prevTimer => prevTimer + 1); },1000)

        intervalRef.current = setInterval((dat) => {
            if (timer > 0) {
                console.log(timer);
            }
            setTimer(prevTimer => prevTimer+1);
        }, 1000);
    }

    

    function stopTimer() {
        clearInterval(intervalRef.current);
    }



    function check(current) {

        if (items[current].id === items[prev].id && items[current].counter != items[prev].counter) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setPrev(-1);
        } else {
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setItems([...items]);
            setIsAlreadyChecking(true);
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setItems([...items]);
                setIsAlreadyChecking(false);
                setPrev(-1);
            }, 1010); // 1000ms + 10ms
        }

        let isWin = items.filter(item => item.stat === "correct").length
        if (isWin === items.length) {
            setTimeout(() => {
                alert("Поздравляем! Вы сопоставили все карточки!");
                resetGame()
            }, 1000);
            
        }
    }

    function resetGame() {
        setItems([...items.map(item => ({ ...item, stat: "" }))]);
        setTimer(0);
        stopTimer()
        setResetVisible(false);
        
    }

    function handleClick(id) {
        if (!timer) {
            startTimer();
            setResetVisible(true);
        }
            
        if (!isAlreadyChecking) {
            if (prev === -1) {
                items[id].stat = "active";
                setItems([...items]);
                setPrev(id);
            } else {
                check(id);
            }
        }
    }

    return (
        <div >
            <div>Время: {timer} секунд</div>
            <div className="container" style={{ zoom: zoom }}>
                {!isSort ? null : items.map((item, index) => (
                    <Card key={index} item={item} id={index} handleClick={handleClick} />
                ))}
            </div>
        </div>
    );
}


export default Cards;