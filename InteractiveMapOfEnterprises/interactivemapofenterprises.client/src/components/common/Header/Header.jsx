import React, { Component, useState, useEffect,  } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const toggleMenuIcon = "./toggle-menu.svg";
import authService from "../../../services/authService";
import useCookieHandler from "../../../services/useCookieHandler";



const Header = ()=> {
    const { handleCookie } = useCookieHandler();

    const [isOpenStatus, setOpenStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState({});

    const menuHandler = () => {
        setOpenStatus(!isOpenStatus);
    };
   
    const logOut = async () => {
        authService.logout(handleCookie);
        const data = await authService.getCurrentUser();
        setCurrentUser(data);
    }

    useEffect(async () => {
        try {
            const data = await authService.getCurrentUser();
            setCurrentUser(data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    }, []); 

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
                    <span><Link to="/map" style={{ marginRight: "10px", cursor: "pointer" }}>Карта</Link></span>
                    {currentUser == null || currentUser == undefined || currentUser == "null" ?
                        <span style={{ display: "flex" }}>
                            <li><button><Link to="/catalog" style={{ marginRight: '10px', cursor: 'pointer' }}>Catalog</Link></button></li>
                            <li><Link to="/login" style={{ marginRight: '10px', cursor: 'pointer' }}>Войти</Link></li>
                            <li><Link to="/user/create" style={{ marginRight: '10px', cursor: 'pointer' }}>Создать аккаунт</Link></li>
                        </span>
                        : 
                        <span style={{ display: "flex" }}>
                            <li><button><Link to="/catalog" style={{ marginRight: '10px', cursor: 'pointer' }}>{currentUser.UserName}</Link></button></li>
                            <li><button onClick={logOut}>Выйти</button></li>
                        </span>
                    }
                   
                    {/*<Link to="/editor" style={{ marginRight: '10px', cursor: 'pointer' }}>Editor</Link>*/}
                    {/*<Link to="/company" style={{ cursor: 'pointer' }}>Company</Link>*/}
                </ul>
            </div>
        </nav>
    );
    
}

export default Header;