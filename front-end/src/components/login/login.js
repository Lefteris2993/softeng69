import React from "react";
import "./login.scss";
import config from "../../config";
import axios from "axios";
import qs from "querystring";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: [],
      redirect: false,
      token: null,
      isAdmin: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
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

  //handleChange (event) {
  //    this.setState({[event.target.name]: event.target.value});
  //    this.clearValidationErr(event.target.name);
  //}

  handleSubmit(event) {
    if (this.state.username === "") {
      this.showValidationErr("username", "Username Cannot be empty!");
    }
    if (this.state.password === "") {
      this.showValidationErr("password", "Password Cannot be empty!");
    }

    if (this.state.password !== "" && this.state.username !== "") {
      axios({
        method : 'post',
        url: config.apiUrl + '/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(reply => {
        console.log(reply.data);
        localStorage.setItem('token', reply.data.token);
        localStorage.setItem('isAdmin', reply.data.isAdmin);
        this.setState({ redirect: true, token: reply.data.token, isAdmin: reply.data.isAdmin });
      }).catch(err => {
        console.log(err);//need more 
      })
    }
    event.preventDefault();
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.handleLogin(this.state.token, this.state.isAdmin)
    }
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
        {this.renderRedirect()}
      </div>

    )
  }
}

export default Login;