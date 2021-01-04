import React from 'react'
import './logoutbutton.scss'
import {logoutUser} from "../../api";


class Logoutbutton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logouterror:null};
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(event) {
        logoutUser()
        .then((res) => {
            if(res.ok){
                alert("Successful logout");
            }
            else{
                alert("Something went wrong! " + res.status);
            }
        })
        .catch(err => {
          this.setState({ logouterror: err.error })
        });
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