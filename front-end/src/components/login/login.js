import React from "react";
import "./login.scss";
import { authenticateUser } from "../../api";
import qs from "querystring";
import axios from "axios";

//var myStorage = window.sessionStorage;
sessionStorage.setItem('token', 'null');

// Get saved data from sessionStorage
//let data = sessionStorage.getItem('key');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', token: null, autherror: null, errors: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];

      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }
  onUsernameChange(event) {
    this.setState({ username: event.target.value });
    this.clearValidationErr("username");
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    this.clearValidationErr("password");
  }

  handleSubmit(event) {
    //make sure we got username and pswd

    if (this.state.username === "") {
      this.showValidationErr("username", "Username Cannot be empty!");
    }
    if (this.state.password === "") {
      this.showValidationErr("password", "Password Cannot be empty!");
    }

    //now send to backend
    this.setState({ autherror: null });
    if (this.state.password !== "" && this.state.username !== "") {
      alert('A name was submitted: ' + this.state.username + this.state.password);
      this.setState({ token: null });
      let reqObj = {
        username: this.state.username,
        password: this.state.password
      };
      authenticateUser(reqObj)
        .then(json => {
          //alert("Response: " + qs.stringify(json.data));
          var s = qs.stringify(json.data);
           var parts = s.split('='); // split the string with these characters
          var t=parts[1];
          sessionStorage.setItem('token',t);
          //axios.defaults.headers.post['X-OBSERVATORY-AUTH'] = sessionStorage.getItem('token');
          //alert('token: ' + sessionStorage.getItem('token'));
        })
        .catch(err => {
          this.setState({ autherror: err.error })
        });
    }
    //alert('token: ' + sessionStorage.getItem('token'));
    //event.preventDefault();
  }

  render() {

    let usernameErr = null,
      passwordErr = null;
    //Loop and find which ones has the error
    for (let err of this.state.errors) {
      //Assign the validation error message 
      if (err.elm === "username") {
        usernameErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
    }

    return (
      <div className="Login">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
            onChange={this
              .onUsernameChange} />
          <small className="danger-error">{usernameErr
            ? usernameErr
            : ""}
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
            onChange={this
              .onPasswordChange} />
          <small className="danger-error">{passwordErr
            ? passwordErr
            : ""}
          </small>
        </div>

        <button
          type="button"
          className="login-btn"
          onClick={this
            .handleSubmit}>Login</button>
      </div>

    );
  }
}

export default Login;