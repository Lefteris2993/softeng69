import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from './components/login/login';
import { About } from './components/about/about';
import Charge from './components/charge/charge';
import Bill from './components/periodic_bill/bill';


class Main extends React.Component {
    render() {
        return (
            <div>
                {this.props.loggedIn?
                    <>
                    <Route exact path="/" component={About}/>
                    <Route exact path="/home" component={About}/>
                    <Route exact path="/charge"
                        token={this.props.token}
                        component={Charge} 
                    />
                    <Route exact path="/bill"
                        token={this.props.token}
                        component={Bill} 
                    />
                    </>
                    :
                    <Login handleLogin={this.props.handleLogin}/>
                }
            </div>
        )
    }
}

export default Main;