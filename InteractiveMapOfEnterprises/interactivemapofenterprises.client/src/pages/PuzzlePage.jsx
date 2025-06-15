import React, { useEffect, useState } from 'react';
import { Motion, spring } from "react-motion";
import ContentWithPaddings from '../components/common/ContentWithPaddings';
import companiesService from '../services/companiesService';
import GamePageContent from "../components/GamePage/GamePageContent";

const TILE_COUNT = 16;
const GRID_SIZE = 4;
const BOARD_SIZE = 350;

const PuzzlePage = () => {

    const emptyIcons = ['/gamesContent/belaz.png',
        '/gamesContent/belwest.png',
        '/gamesContent/kommunarka.png',
        '/gamesContent/maz.png',
        '/gamesContent/milavitsa.png',
        '/gamesContent/milk.png',
        '/gamesContent/redPisch.png',
        '/gamesContent/blink.png']

    const [imgUrl, setImgUrl] = useState("")
    const [curCompany, setCurCompany] = useState(null);

    useEffect(() => {
        async function getCompany() {
            var itemsDb = await companiesService.getAll();
            itemsDb = itemsDb.filter(i => i.imageBytes != null).sort(() => Math.random() - 0.5);
            setCurCompany(itemsDb[0])
            let src = itemsDb[0]?.imageBytes ? `data:image/png;base64,${itemsDb[0]?.imageBytes}` : null;
            if (src == null) {
                src = emptyIcons.sort(() => Math.random() - 0.5)[0];
            }
            setImgUrl(src);
        }

        getCompany();
    }, []);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("img")) {
            setImgUrl(urlParams.get("img"))
        }
    }, [])

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);



    return (


        <GamePageContent currentGameIndex={1} >
                   
            <div className="flexContent" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", gridGap: "5px", backgroundColor: "white", borderRadius: "10px" }}>
                <div className="flexContent" style={{flexDirection:"column"}}>
                    <Board imgUrl={imgUrl} />
                    <div>{curCompany?.name}</div>
                </div>
                <div className="flexContent" style={{ flexDirection: "column" }}>
                    <Board imgUrl={imgUrl} disabled={ true} />
                    <div></div>
                </div>
            </div>
            {/*<div class="group" style={{ marginTop: "50px" }}>*/}
            {/*    <input type="text" value={imgUrl} onChange={handleImageChange} />*/}
            {/*    <span class="highlight"></span>*/}
            {/*    <span class="bar"></span>*/}
            {/*    <label>Адрес изображения</label>*/}
            {/*</div>*/}
        </GamePageContent>
    );
}

export default PuzzlePage;

//<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "30%" }}>
//    <h3>«Двигающиеся пазлы»</h3>
//    <p>
//        Игра Puzzle или двигающиеся пазлы будет понятна многим за счет схожести с пазлами и детскими кубиками.
//        Однако данная игра требует больше усидчивости и продумывания ходов, что делает ее схожей с Кубик Рубика.
//        Двигающиеся пазлы состоят из области, к которой складывается изображение и двигающихся пазлов.
//    </p>
//    <p>
//        Суть игры проста. Необходимо двигать пазлы последовательно чтобы по итогу мы получили первоначальное изображение.
//    </p>
//</div>


function Board({ imgUrl,disabled=false }) {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState(false);
    console.log('is started:', isStarted)

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles);
    }

    const swapTiles = (tileIndex) => {
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
            setTiles(swappedTiles)
        }
    }

    const handleTileClick = (index) => {
        swapTiles(index)
    }

    const handleShuffleClick = () => {
        shuffleTiles()
    }

    const handleStartClick = () => {
        shuffleTiles()
        setIsStarted(true)
    }

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
    const style = {
        objectFit:"cover",
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px 0px",
        borderRadius: "15px",
        padding:"10px"
    };
    const hasWon = isSolved(tiles)

    return (
        <div style={{ display: "flex", flexDirection: "column" }} className="board">
            {disabled ? <img style={style} src={imgUrl}></img> :
        
            <ul style={style} className="board">
                {tiles.map((tile, index) => (
                    <Tile
                        key={tile}
                        index={index}
                        imgUrl={imgUrl}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleTileClick={handleTileClick}
                    />
                ))}
                </ul>
            }
            {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
            {disabled ? <div style={{ marginTop: "26px" }} >ㅤ</div> : 
                !isStarted ?
                (<button style={{marginTop:"10px"}} onClick={() => handleStartClick()}>Начать</button>) :
                (<button style={{marginTop:"10px"}} onClick={() => handleShuffleClick()}>Заново</button>)
           }
        </div>
    );
}

//function Tile(props) {
//    const { tile, index, width, height, handleTileClick, imgUrl } = props;

//    const { row, col } = getMatrixPosition(index);
//    const visualPos = getVisualPosition(row, col, width, height);
//    const tileStyle = {
//        width: `calc(100% / ${GRID_SIZE})`,
//        height: `calc(100% / ${GRID_SIZE})`,
//        translateX: visualPos.x,
//        translateY: visualPos.y,
//        backgroundImage: `url(${imgUrl})`,
//        //backgroundSize: 'cover', // Ensure the image covers the entire tile
//        backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
//    };
//    const motionStyle = {
//        translateX: spring(visualPos.x),
//        translateY: spring(visualPos.y)
//    }

//    return (
//        <Motion style={motionStyle}>
//            {({ translateX, translateY }) => (
//                <li
//                    style={{
//                        ...tileStyle,
//                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
//                        opacity: tile === TILE_COUNT - 1 ? 0 : 1,
//                    }}
//                    className="tile"
//                    onClick={() => { handleTileClick(index) }}
//                >
//                    {
//                        imgUrl != null ? null : <div style={{ borderRadius: "30px", backgroundColor: "aliceblue", padding: "2px" }}>{tile + 1}</div>
//                    }

//                </li>
//            )}
//        </Motion>
//    );
//}

async function cropImageToSquare(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext('2d');
            // Center crop
            const offsetX = (img.width - size) / 2;
            const offsetY = (img.height - size) / 2;
            ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

            resolve(canvas.toDataURL());
        };
    });
}




function Tile(props) {
    const { tile, index, width, height, handleTileClick, imgUrl } = props;


    // Then in your component:
    const [croppedUrl, setCroppedUrl] = useState(null);

    useEffect(() => {
        if (imgUrl) {
            cropImageToSquare(imgUrl).then(setCroppedUrl);
        }
    }, [imgUrl]);

    const { row, col } = getMatrixPosition(index);
    const visualPos = getVisualPosition(row, col, width, height);
    const tileStyle = {
        width: `calc(100% / ${GRID_SIZE})`,
        height: `calc(100% / ${GRID_SIZE})`,
        translateX: visualPos.x,
        translateY: visualPos.y,
        backgroundImage: `url(${croppedUrl})`,
        backgroundSize: `${BOARD_SIZE}px`,
        backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,

    };
    const motionStyle = {
        translateX: spring(visualPos.x),
        translateY: spring(visualPos.y)
    }

    return (
        <Motion style={motionStyle}>
            {({ translateX, translateY }) => (
                <li
                    style={{
                        ...tileStyle,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                        // Is last tile?
                        opacity: tile === TILE_COUNT - 1 ? 0 : 1,
                    }}
                    className="tile"
                    onClick={() => handleTileClick(index)}
                >
                    {!imgUrl && `${tile + 1}`}
                </li>
            )}
        </Motion>
    );
}

export function isSolvable(tiles) {
    let product = 1;
    for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
        for (let j = i + 1, m = l + 1; j <= m; j++) {
            product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
        }
    }
    return Math.round(product) === 1;
}

export function isSolved(tiles) {
    for (let i = 0, l = tiles.length; i < l; i++) {
        if (tiles[i] !== i) {
            return false;
        }
    }
    return true;
}

// Get the linear index from a row/col pair.
export function getIndex(row, col) {
    return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

// Get the row/col pair from a linear index.
export function getMatrixPosition(index) {
    return {
        row: Math.floor(index / GRID_SIZE),
        col: index % GRID_SIZE,
    };
}

export function getVisualPosition(row, col, width, height) {
    return {
        x: col * width,
        y: row * height,
    };
}

export function shuffle(tiles) {
    const shuffledTiles = [
        ...tiles
            .filter((t) => t !== tiles.length - 1)
            .sort(() => Math.random() - 0.5),
        tiles.length - 1,
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
        ? shuffledTiles
        : shuffle(shuffledTiles);
}

export function canSwap(srcIndex, destIndex) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
    const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles, src, dest) {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
}

export function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split("=")[0] !== param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}



//const PuzzleGame = ({ difficulty }) => {
//    const [stage, setStage] = useState(null);
//    const [canvas, setCanvas] = useState(null);
//    const [img, setImg] = useState(null);
//    const [pieces, setPieces] = useState([]);
//    const [puzzleWidth, setPuzzleWidth] = useState(0);
//    const [puzzleHeight, setPuzzleHeight] = useState(0);
//    const [pieceWidth, setPieceWidth] = useState(0);
//    const [pieceHeight, setPieceHeight] = useState(0);
//    const [currentPiece, setCurrentPiece] = useState(null);
//    const [currentDropPiece, setCurrentDropPiece] = useState(null);
//    const [mouse, setMouse] = useState({ x: 0, y: 0 });

//    useEffect(() => {
//        const init = (difficulty) => {
//            document.ontouchmove = (event) => { event.preventDefault(); };
//            const image = new Image();
//            image.addEventListener('load', () => onImage(image), false);
//            image.src = "img/maz.jpg";
//            setImg(image);
//        };

//        const onImage = (image) => {
//            const pieceWidth = Math.floor(image.width / difficulty);
//            const pieceHeight = Math.floor(image.height / difficulty);
//            const puzzleWidth = pieceWidth * difficulty;
//            const puzzleHeight = pieceHeight * difficulty;

//            setPieceWidth(pieceWidth);
//            setPieceHeight(pieceHeight);
//            setPuzzleWidth(puzzleWidth);
//            setPuzzleHeight(puzzleHeight);

//            setCanvas(document.getElementById('canvas'));
//            setStage(canvas.getContext('2d'));
//            canvas.width = puzzleWidth;
//            canvas.height = puzzleHeight;
//            canvas.style.border = "0px solid transparent";

//            initPuzzle();
//        };

//        init(difficulty);

//    }, [difficulty]);

//    useEffect(() => {
//        setCanvas(document.getElementById('canvas'));
//        setStage(canvas.getContext('2d'));
//        canvas.width = _puzzleWidth;
//        canvas.height = _puzzleHeight;
//        canvas.style.border = "0px solid transparent";
//        initPuzzle();
//    }, []);

//    const initPuzzle = () => {
//        setPieces([]);
//        setMouse({ x: 0, y: 0 });
//        setCurrentPiece(null);
//        setCurrentDropPiece(null);
//        stage.drawImage(img, 0, 0, _puzzleWidth, _puzzleHeight, 0, 0, _puzzleWidth, _puzzleHeight);
//        createTitle("Click para empezar el Puzzle");
//        buildPieces();
//    };

//    const createTitle = (msg) => {
//        stage.fillStyle = "#000000";
//        stage.globalAlpha = 0.4;
//        stage.fillRect(100, _puzzleHeight - 40, _puzzleWidth - 200, 40);
//        stage.fillStyle = "#aec90b";
//        stage.globalAlpha = 1;
//        stage.textAlign = "center";
//        stage.textBaseline = "middle";
//        stage.font = "18px Lato";
//        stage.fillText(msg, _puzzleWidth / 2, _puzzleHeight - 20);
//    };

//    const buildPieces = () => {
//        let xPos = 0;
//        let yPos = 0;
//        let newPieces = [];
//        for (let i = 0; i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY; i++) {
//            const piece = { sx: xPos, sy: yPos };
//            newPieces.push(piece);
//            xPos += _pieceWidth;
//            if (xPos >= _puzzleWidth) {
//                xPos = 0;
//                yPos += _pieceHeight;
//            }
//        }
//        setPieces(newPieces);
//        document.onmousedown = shufflePuzzle;
//        document.getElementById('canvas').ontouchstart = shufflePuzzle;
//    };

//    const shufflePuzzle = () => {
//        let newPieces = shuffleArray(pieces.slice());
//        stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
//        let xPos = 0;
//        let yPos = 0;
//        for (let i = 0; i < newPieces.length; i++) {
//            let piece = newPieces[i];
//            piece.xPos = xPos;
//            piece.yPos = yPos;
//            stage.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
//            stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
//            xPos += pieceWidth;
//            if (xPos >= puzzleWidth) {
//                xPos = 0;
//                yPos += pieceHeight;
//            }
//        }
//        document.onmousedown = onPuzzleClick;
//        document.getElementById('canvas').ontouchstart = onPuzzleClick;
//    };

//    const onPuzzleClick = (e) => {
//        let mouseX, mouseY;
//        if (e.layerX || e.layerX == 0) {
//            mouseX = e.layerX - canvas.offsetLeft;
//            mouseY = e.layerY - canvas.offsetTop;
//        } else if (e.offsetX || e.offsetX == 0) {
//            mouseX = e.offsetX - canvas.offsetLeft;
//            mouseY = e.offsetY - canvas.offsetTop;
//        }
//        let clickedPiece = checkPieceClicked(mouseX, mouseY);
//        if (clickedPiece != null) {
//            stage.clearRect(clickedPiece.xPos, clickedPiece.yPos, pieceWidth, pieceHeight);
//            stage.save();
//            stage.globalAlpha = 0.9;
//            stage.drawImage(img, clickedPiece.sx, clickedPiece.sy, pieceWidth, pieceHeight, mouseX - (pieceWidth / 2), mouseY - (pieceHeight / 2), pieceWidth, pieceHeight);
//            stage.restore();
//            document.onmousemove = updatePuzzle;
//            document.getElementById('canvas').ontouchmove = updatePuzzle;
//            document.onmouseup = pieceDropped;
//            document.getElementById('canvas').ontouchend = pieceDropped;
//        }
//    };

//    const checkPieceClicked = (x, y) => {
//        for (let i = 0; i < pieces.length; i++) {
//            let piece = pieces[i];
//            if (x < piece.xPos || x > (piece.xPos + pieceWidth) || y < piece.yPos || y > (piece.yPos + pieceHeight)) {
//                // PIECE NOT HIT
//            } else {
//                return piece;
//            }
//        }
//        return null;
//    };

//    const updatePuzzle = (e) => {
//        currentDropPiece = null;
//        let mouseX, mouseY;
//        if (e.layerX || e.layerX == 0) {
//            mouseX = e.layerX - canvas.offsetLeft;
//            mouseY = e.layerY - canvas.offsetTop;
//        } else if (e.offsetX || e.offsetX == 0) {
//            mouseX = e.offsetX - canvas.offsetLeft;
//            mouseY = e.offsetY - canvas.offsetTop;
//        }

//        // Update the puzzle logic accordingly
//    };

//    const pieceDropped = (e) => {
//        // Implement the pieceDropped logic
//    };

//    const resetPuzzleAndCheckWin = () => {
//        // Implement the resetPuzzleAndCheckWin logic
//    };

//    const gameOver = () => {
//        // Implement the gameOver logic
//    };

//    const shuffleArray = (array) => {
//        let newArray = array.slice();
//        for (let i = newArray.length - 1; i > 0; i--) {
//            const j = Math.floor(Math.random() * (i + 1));
//            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//        }
//        return newArray;
//    };

//    return (
//        <canvas id="canvas"></canvas>
//    );
//};

//export default PuzzleGame;