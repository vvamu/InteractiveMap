import ApplicationUrl from "../../../models/ApplicationUrl";
import { Link } from "react-router-dom";
import MenuGames from "./MenuGames";

const MenuUnAuthorized = ({ isOpenStatus }) => {
    return (
        <span className={isOpenStatus ? "Navbar-links" : "Navbar-links Navbar-links--closed"}>
            <li><Link to="/map" style={{ marginRight: "10px", cursor: "pointer" }}>Карта</Link></li>
            <li><Link to="/login" style={{ marginRight: '10px', cursor: 'pointer' }}>Войти</Link></li>
            <li><Link to={ApplicationUrl.User.app.create} style={{ marginRight: '10px', cursor: 'pointer' }}>Создать аккаунт</Link></li>
            <MenuGames/>
        </span>
    )
}
export default MenuUnAuthorized;