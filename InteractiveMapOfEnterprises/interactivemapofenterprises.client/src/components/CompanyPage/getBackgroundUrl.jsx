

export function getBackgroundUrl(props) {

    let backgroundUrl = "";
    switch (props.category) {
        case "Производство продуктов питания":
            backgroundUrl = "url(/companyTypes/products2.png)"; break;
        case "Машиностроительные предприятия":
            backgroundUrl = "url(/companyTypes/car2.webp)"; break;
        case "Химическая промышленность":
            backgroundUrl = "url(/companyTypes/chemistry2.jpg)"; break;
        case "Легкая промышленность":
            backgroundUrl = "url(/companyTypes/light2.webp)"; break;
        case "Металлообработка и металлургия":
            backgroundUrl = "url(/companyTypes/black2.jpg)"; break;
        case "Деревообработка":
            backgroundUrl = "url(/companyTypes/wood2.jpg)"; break;
        case "Электроника и электротехника":
            backgroundUrl = "url(/companyTypes/elecricity2.jpg)"; break;
        case "Фармацевтическая промышленность":
            backgroundUrl = "url(/companyTypes/farmaceptical2.webp)"; break;

        default: backgroundUrl = "url(/companyTypes/empty2.jpg)"; break;
    }

    return (backgroundUrl);
}

export default getBackgroundUrl;