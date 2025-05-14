import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const toggleMenuIcon = "./toggle-menu.svg"

class Header extends Component {
    state = {
        isOpened: false
    };

    menuHandler = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    };

    render() {
        return (
            <nav className="Navbar">
                <div className="Logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/">
                            <img src="/history-svgrepo-com.svg" alt="History Icon" style={{ width: '30px', marginRight: '10px' }} />
                        </Link>
                        <Link to="/" style={{ marginRight: '10px', cursor: 'pointer' }}>Home</Link>
                    </div>
                </div>

                <button className="toggleBtn" onClick={this.menuHandler}>

                    <img src={toggleMenuIcon} alt="Open menu" style={{ width:"30px" }} />
                </button>
                <ul className={this.state.isOpened ? "Navbar-links" : "Navbar-links Navbar-links--closed"}>
                    <Link to="/map" style={{ marginRight: "10px", cursor: "pointer" }}>Map</Link>
                    <Link to="/catalog" style={{ marginRight: '10px', cursor: 'pointer' }}>Catalog</Link>
                    {/*<Link to="/editor" style={{ marginRight: '10px', cursor: 'pointer' }}>Editor</Link>*/}
                    {/*<Link to="/company" style={{ cursor: 'pointer' }}>Company</Link>*/}
                </ul>
            </nav>
        );
    }
}

export default Header;