import ApplicationUrl from "../../../models/ApplicationUrl";
import { Link } from "react-router-dom";
import MenuGames from "./MenuGames";

const MenuUnAuthorized = ({ isOpenStatus,children }) => {
    return (
        <>
            
            
            <li>{children}</li>
        </>
    )
}
export default MenuUnAuthorized;