import React from 'react';
import NavbarMain from './components/navbarmain/navbarmain';
import Login from './components/login/login';
//import {About} from './components/about/about';
//import Startheader from './components/startheader/startheader';
//import Charge from './components/charge/charge';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
  return (
    <div className="root-container">
      <NavbarMain />
      <div className="login-container">
       <Login />
      </div>
     
    </div>
  );
  }
}

export default App;