import React from 'react'
import './logoutbutton.scss'
import config from "../../config";
import axios from "axios";
import { Redirect } from 'react-router-dom';


class Logoutbutton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logouterror:null, redirect: false};
        this.handleLogout = this.handleLogout.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }
    handleLogout(event) {
        axios({
            method: 'post',
            url: config.apiUrl + '/logout',
            headers: {'x-observatory-auth': sessionStorage.getItem('token')}
          }).then( res => {
            console.log(res);
            if(res.status === 200){
                //alert("Successful logout");
                sessionStorage.removeItem('token');
                this.setState({ redirect: true });
            }
        })
        
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />;
        }
      }

    render() {

        return (
            <div className="Logout">
                <button 
                type="button" 
                className="logout-btn btn--primary btn--medium" 
                onClick={this
                .handleLogout}>Logout</button >
                {this.renderRedirect()}
            </div>
        );
    }
}

export default Logoutbutton;