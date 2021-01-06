import React from 'react'
import './logoutbutton.scss'
import config from "../../config";
import axios from "axios";


class Logoutbutton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logouterror:null};
        this.handleLogout = this.handleLogout.bind(this);
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
                this.props.handleLogout();
                console.log(this.state);
            }
        })
        
    }

    render() {

        return (
            <div className="Logout">
                <button 
                type="button" 
                className="logout-btn btn--primary btn--medium" 
                onClick={this
                .handleLogout}>Logout</button >
            </div>
        );
    }
}

export default Logoutbutton;