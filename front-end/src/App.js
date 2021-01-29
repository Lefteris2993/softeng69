import React from 'react';
import NavbarMain from './components/navbarmain/navbarmain';
import './App.scss';
import Main from './main'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    var a = localStorage.getItem('isAdmin');
    var t = localStorage.getItem('token');
    var l;
    if(t===null || t==='') {
      l = false;
    } else {
      l = true;
    }
    if(a==='undefined'||a==='false') {
      a = false;
    } else {
      a = true;
    }
    this.state = {
      loggedIn: true, //care here must not be true!
      isAdmin: a,
      token: t
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin = (token, admin) => {
    this.setState({ token: token, isAdmin: admin })
    localStorage.setItem('loggedIn', true);
    this.setState({ loggedIn: true });
  }

  handleLogout = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div className="root-container">
        <Router>
          <NavbarMain 
            handleLogout={this.handleLogout} 
            loggedIn={this.state.loggedIn} 
            isAdmin={this.state.isAdmin}/>
          <div className="main-container">
            <Main 
              token={this.state.token}
              isAdmin={this.state.isAdmin}
              loggedIn={this.state.loggedIn} 
              handleLogin={this.handleLogin}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;