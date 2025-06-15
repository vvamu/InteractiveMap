import ApplicationUrl from "../../models/ApplicationUrl";

const games = [
    { name: "Мемори", url: ApplicationUrl.Game.app.get + "memo", src: "/gamesContent/screenMemo.png", desription: "Карточки выкладываются на стол «рубашкой» вверх. Найдя все одинаковые карточки вы выиграли." },
    { name: "Двигающиеся пазлы", url: ApplicationUrl.Game.app.get + "puzzle", src: "/gamesContent/screenPuzzle.png", desription: "Необходимо двигать пазлы последовательно чтобы по итогу мы получили первоначальное изображение." }]

export default games;