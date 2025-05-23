import { useState ,useEffect,useRef } from 'react';
import Card from './Card';
import companiesService from '../../services/companiesService';

function Cards() {

    const [isCompleted, setIsCompleted] = useState(false);
    const [isSort, setIsSort] = useState(false);

    const [items, setItems] = useState([].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1);
    const [isAlreadyChecking, setIsAlreadyChecking] = useState(false);
    const [timer, setTimer] = useState(0);
    let intervalRef = useRef();

    useEffect(() => {
        async function getCompanies() {
            if (items.length > 0) return;
            var itemsDb = await companiesService.getAll();

            itemsDb = itemsDb.filter(i => i.imageBytes != null).sort(() => Math.random() - 0.5);
            let maxLenght = itemsDb.length > 8 ? 8 : itemsDb.length;

            let newItems = [];
            for (var i = 0; i < maxLenght; i++) {
                let src = `data:image/png;base64,${itemsDb[i].imageBytes}`;
                let newItem = { id: i, img: src, stat: "", counter: 0 };
                let newItem2 = { id: i, img: src, stat: "", counter: 1 };

                setItems(prevItems => [...prevItems, newItem]);
                setItems(prevItems => [...prevItems, newItem2]);
            }

            setIsCompleted(true);
        }

        getCompanies();
    }, []);

    useEffect(() => {
        let tut = items.sort(() => Math.random() - 0.5)
        setItems(tut)
        setIsSort(true);

    },[isCompleted])
    


 
    function startTimer() {
        intervalRef.current = setInterval(() => {
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
                setItems([...items.map(item => ({ ...item, stat: "" }))]);
                setTimer(0);
                stopTimer()
            }, 1000);
            
        }
    }

    function handleClick(id) {
        if (!timer)
            startTimer();
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
            <div className="container">
                {!isSort ? null : items.map((item, index) => (
                    <Card key={index} item={item} id={index} handleClick={handleClick} />
                ))}
            </div>
        </div>
    );
}


export default Cards;