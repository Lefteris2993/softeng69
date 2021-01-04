import React from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route
// } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import  Logoutbutton  from "../logoutbutton/logoutbutton";
// import Charge from "../charge/charge"
import './navbarmain.scss'

class NavbarMain extends React.Component {


    render() {
        return (

            <nav className="NavbarItems">
                <h1 className="navbar-logo"><i className="fas fa-plug">  Eos</i></h1>
                <ul className='nav-menu'>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Logoutbutton />
                {/* <Router>
                    <div>
                        <Switch>
                            <Route path="/charge">
                                <Charge />
                            </Route>
                        </Switch>
                    </div>
                </Router> */}
            </nav>


        );
    }
}

export default NavbarMain;