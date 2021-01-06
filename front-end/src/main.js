import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from './components/login/login';
import { About } from './components/about/about';
import Charge from './components/charge/charge';
import Admin from './components/admin/admin';


class Main extends React.Component {
    render() {
        return (
            <div>
                {this.props.loggedIn?
                    <>
                    <Route exact path="/" component={About}/>
                    <Route 
                        render={ (props) => <Admin 
                            token={this.props.token}
                            isAdmin={this.props.isAdmin}
                            {...props}/>}
                        path="/admin" />
                    <Route exact path="/home" component={About}/>
                    <Route exact path="/charge"
                        token={this.props.token}
                        component={Charge} 
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