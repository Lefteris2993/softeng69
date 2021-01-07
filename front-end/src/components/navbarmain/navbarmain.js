import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItems } from "./MenuItems";
import  Logoutbutton  from "../logoutbutton/logoutbutton";
// import Charge from "../charge/charge"
import './navbarmain.scss'

import styles from './navbarmain.scss'

class NavbarMain extends React.Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <nav className="NavbarItems">
                {console.log(this.props)}
                <h1 className="navbar-logo"><i className="fas fa-plug">  Eos</i></h1>
                {this.props.loggedIn?
                <div>
                    <ul className='nav-menu'>
                        {this.props.isAdmin &&
                        <li>
                            <NavLink className='nav-links' to={`/admin`}>Admin</NavLink>
                        </li>}
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink className="nav-links" to={`/${item.url}`}>{item.title}</NavLink>
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