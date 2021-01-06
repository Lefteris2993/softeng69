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
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo"><i className="fas fa-plug">  Eos</i></h1>
                {this.props.loggedIn?
                <div>
                    <ul className='nav-menu'>
                        {this.props.isAdmin?
                        <li>
                            <a className='nav-links' href='admin'>
                                Admin
                            </a>
                        </li>:
                        <li></li>}
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
                    
                </div>
                :
                <h1 className="logo">
                    <i className="greeting"> Welcome, please login!</i>
                </h1>
                }
                {this.props.loggedIn?<Logoutbutton handleLogout={this.props.handleLogout}/>:<></>}
                
            </nav>


        );
    }
}

export default NavbarMain;