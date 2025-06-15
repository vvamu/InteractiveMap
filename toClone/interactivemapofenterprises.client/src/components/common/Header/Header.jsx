import React, { Component, useState, useEffect,  } from "react";
import { Link ,useLocation} from "react-router-dom";
import "./Header.css";
const toggleMenuIcon = "/toggle-menu.svg";


import ContentWithPaddings from "../ContentWithPaddings";



import MenuAuthorization from "./MenuAuthorization"
import MenuMainContent from "./MenuMainContent";


const Header = ({ currentUser, changeUser })=> {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const [isOpenStatus, setOpenStatus] = useState(false)

    const menuHandler = () => {
        setOpenStatus(!isOpenStatus); 
    };
   

    return (
        <ContentWithPaddings className="flexContent boxShadow" style={{ backgroundColor: "rgb(255 255 255 / 80%)", justifyContent:"space-between" }}>
            

            <div className="flexContent">
             
                    {/*<Link to="/">*/}
                    {/*    <img src="/history-svgrepo-com.svg" alt="History Icon" style={{ width: '30px', marginRight: '10px'}} />*/}
                    {/*</Link>*/}
                    <Link to="/" className="logotype" ><img src="/MadeInBelarus.jpg" style={{ height: "35px" }} /></Link>
               
            </div>

            <button className="toggleBtn" onClick={menuHandler}>
                <img src={toggleMenuIcon} alt="Open menu" style={{ width:"30px" }} />
            </button>
            <ul className={isOpenStatus ? "Navbar-links " : "Navbar-links Navbar-links--closed "} style={{ gridGap: "10px" }}> 
                
                <MenuMainContent currentUser={currentUser} isActive={ isActive} />
                <MenuAuthorization currentUser={currentUser} changeUser={changeUser} isActive={isActive} />
            </ul>
            
        </ContentWithPaddings>
    );
    
}

export default Header;