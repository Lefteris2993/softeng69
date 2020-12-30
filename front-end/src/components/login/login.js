import React from "react";
import "./login.scss";
import { authenticateUser } from "../../api";

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
        if (elm != err.elm) {
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
    
    if (this.state.username == "") {
      this.showValidationErr("username", "Username Cannot be empty!");
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Password Cannot be empty!");
    }

    //now send to backend
    this.setState({ autherror: null });
    if (this.state.password != "" && this.state.username != "") {
      alert('A name was submitted: ' + this.state.username +this.state.password);
      this.setState({ token: null });
      let reqObj = {
        username: this.state.username,
        password: this.state.password
      };
      authenticateUser(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({ token: json.data.id });
          }, 0);
        })
        .catch(err => {
          this.setState({ autherror: err.error })
        });
    }
    //event.preventDefault();
  }

  render() {

    let usernameErr = null,
      passwordErr = null;
    //Loop and find which ones has the error
    for (let err of this.state.errors) {
      //Assign the validation error message 
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
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