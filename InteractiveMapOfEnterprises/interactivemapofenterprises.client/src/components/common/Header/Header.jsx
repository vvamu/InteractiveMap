import React, { Component, useState, useEffect,  } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const toggleMenuIcon = "./toggle-menu.svg";

import MenuAuthorized from "./MenuAuthorized";
import MenuUnAuthorized from "./MenuUnAuthorized";
import MenuGames from "./MenuGames";


const Header = ({ currentUser, changeUser })=> {

    const [isOpenStatus, setOpenStatus] = useState(false)

    const menuHandler = () => {
        setOpenStatus(!isOpenStatus);
    };
   

    return (
        <nav>
            
            <div className="Navbar" style={{ padding: "10px 45px" }}>
                <div className="Logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/">
                            <img src="/history-svgrepo-com.svg" alt="History Icon" style={{ width: '30px', marginRight: '10px' }} />
                        </Link>
                        <Link to="/" style={{ marginRight: '10px', cursor: 'pointer' }}>Главная</Link>
                    </div>
                </div>

                <button className="toggleBtn" onClick={menuHandler}>

                    <img src={toggleMenuIcon} alt="Open menu" style={{ width:"30px" }} />
                </button>
                <ul className={isOpenStatus ? "Navbar-links" : "Navbar-links Navbar-links--closed"}>
                    
                    {currentUser == null || currentUser == undefined || currentUser == "null" ?
                        <MenuUnAuthorized isOpenStatus={isOpenStatus} / >
                        : 
                        <MenuAuthorized isOpenStatus={isOpenStatus} currentUser={currentUser} changeUser={changeUser } />
                    }
                   
                    {/*<Link to="/editor" style={{ marginRight: '10px', cursor: 'pointer' }}>Editor</Link>*/}
                    {/*<Link to="/company" style={{ cursor: 'pointer' }}>Company</Link>*/}
                </ul>
            </div>
        </nav>
    );
    
}

export default Header;