import React from 'react';
import NavbarMain from './components/navbarmain/navbarmain';
import Login from './components/login/login';
import {About} from './components/about/about';
import Startheader from './components/startheader/startheader';
//import Charge from './components/charge/charge';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
  return (
    <div className="root-container">
      
      <Router>
        <Switch>
          <Route exact path="/">
            <Startheader/>
            <div className = "login-container" >
              <Login/>
            </div>
          </Route>
          <Route exact path="/home">
            <NavbarMain />
            <div className = "login-container" >
              <About/>
            </div> 
          </Route>
        </Switch>
      </Router>
     
    </div>
  );
  }
}

export default App;