import React from 'react';
import { Route, Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import Healthcheck from "./headlthCheck";
import UserMod from './userMod';
import GetUser from './getUser';
import ResetSessions from './resetSessios';
import SessionsUdp from './sessionsupd';


class Admin extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  render () {
    return (
      <div>
        {this.props.isAdmin ? 
        <>
          <AdminNav match={this.props.match} />
          <Route 
            token={this.props.token}
            path={`${this.props.match.path}/healthcheck`} 
            render={ () => <Healthcheck token={this.props.token}/>}/>
          <Route 
            token={this.props.token}
            path={`${this.props.match.path}/usermod`} 
            render={ () => <UserMod token={this.props.token}/>}/>
          <Route 
            token={this.props.token}
            path={`${this.props.match.path}/getuser`} 
            render={ () => <GetUser token={this.props.token}/>}/>
          <Route 
            token={this.props.token}
            path={`${this.props.match.path}/resetsessions`} 
            render={ () => <ResetSessions token={this.props.token}/>}/>
          <Route 
            token={this.props.token}
            path={`${this.props.match.path}/sessionsupd`} 
            render={ () => <SessionsUdp token={this.props.token}/>}/>
          </> :
          <>
            <p>Oops! Your should not be here</p>
            <Link to="/">Go Back</Link>
          </> }
        
      </div>
    );
  }
  
}

export default Admin;
