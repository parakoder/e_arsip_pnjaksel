import React from 'react'
import { NavLink } from 'react-router-dom';
import { HiHome } from "react-icons/hi";

function Sidebar(props) {

    const onActiveCss = {
        // color: '#2893E1'
        fontWeight: 'bold'
    }

    const onActiveImg = {
        color: '25282B'
    }

    const currentLocation = window.location.pathname;


    return (
        <div className="c-sidebar c-sidebar-dark c-sidebar-lg-show c-sidebar-fixed ml-auto">
            {/* <div style={{  height: '100vh' }}> */}
            <div className="c-sidebar-brand">
                <div className="sidebar-brand-logo">

                </div>
                <div className="sidebar-brand-text">
                    E-Arsip Pengadilan Tinggi jakarta Selatan
                    </div>
            </div>

            <ul className="sidebar-nav">
                <li className="sidebar-nav-item">
                    <NavLink className="sidebar-nav-link"
                        to="/sys/home"
                        activeClassName="active"
                        activeStyle={onActiveCss}
                        aria-current="true"
                    >
                        <HiHome
                            className="sidebar-nav-link-img"
                            size={18}
                            style={currentLocation.includes('/sys/home') ? onActiveImg : null}
                        />

                            Home
                        </NavLink>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink className="sidebar-nav-link"
                        to="/sys/arsip"
                        activeClassName="active"
                        activeStyle={onActiveCss}
                        aria-current="true"
                    >
                        Arsip
                        </NavLink>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink className="sidebar-nav-link"
                        to="/sys/log"
                        activeClassName="active"
                        activeStyle={onActiveCss}
                        aria-current="true"
                    >
                        Log Aktifitas
                        </NavLink>
                </li>
                <li className="sidebar-nav-item">
                    <NavLink className="sidebar-nav-link"
                        to="/sys/about"
                        activeClassName="active"
                        activeStyle={onActiveCss}
                        aria-current="true"
                    >
                        About
                        </NavLink>
                </li>
            </ul>

            <div className="c-sidebar-logout"
                onClick={() => props.history.push('/login')}
            >
                <span style={{ cursor: 'pointer' }
                }>Logout</span>
            </div>
                
            {/* </div>  */}
        </div>
    )
}

export default Sidebar
