import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "./navbar-images/fmc-logo.png";
import { useState } from "react";


const NavbarLeft = ({ navbarTab }) => {
    return <>
        <div className="navbar-left">
            <div className="navbar-logo">
                <span>
                    <img
                        src={logo}
                        alt="Firewall Logo"
                        className="logo-img"
                    />
                </span>
                <span className="logo-text">Firewall Management Center

                    {<div className="navbar-subtitle"><span className="navbar-subtitle-objects">{navbarTab}  </span>
                        {navbarTab == "Objects" &&<span className="navbar-subtitle-description">  /Object Management </span>}
                    </div>}

                </span>
            </div>
        </div>
    </>
}

const NavbarCenter = ({ setNavbarTab }) => {
    const navItems = [
        { name: "Overview", path: "/" },
        { name: "Analysis", path: "/analysis" },
        { name: "Policies", path: "/policies" },
        { name: "Devices", path: "/devices" },
        { name: "Objects", path: "/object" },
        { name: "Integration", path: "/integration" },
    ];
    return <div className="navbar-center">
        {navItems.map((item, idx) => (
            <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                }
                onClick={() => { setNavbarTab(item.name) }}
            >
                {item.name}
            </NavLink>
        ))}
    </div>;
}

const NavbarRight = () => {
    return <div className="navbar-right">
        <button className="deploy-btn">Deploy</button>
        <span className="icon search">🔍</span>
        <span className="icon notifications">🔔</span>
        <span className="icon settings">⚙️</span>
        <span className="icon help">❓</span>
        <div className="user-menu">
            <span>admin ⌄</span>
        </div>
        <div className="brand">cisco <span className="secure">SECURE</span></div>
    </div>
}

const Navbar = ({navbarTab,setNavbarTab}) => {
    
    return (
        <div className="navbar">
            <NavbarLeft navbarTab={navbarTab} />
            <NavbarCenter setNavbarTab={setNavbarTab} />
            <NavbarRight />
        </div>
    );
};

export default Navbar;
