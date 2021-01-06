import axios from 'axios';
import React from 'react';

class UserMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      isAdmin: false,
      status: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBox = this.handleChangeBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleChangeBox(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleSubmit (event) {
    axios({
      method: 'post',
      url: 'https://localhost:8765/evcharge/api/admin/usermod/'+this.state.username+'/'+this.state.password,
      headers: {
        'x-observatory-auth': this.props.token
      }
    }).then(result => {
      this.setState({ username: '', password: '', status: result.status });
    }).catch(error => {
      console.log(error);
      this.setState({status: 418});
    })
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}>
          <p>update or register a new user</p>
          <input 
            placeholder="username"
            name="username"
            type="text"
            autoComplete="Off"
            value={this.state.username}
            onChange={this.handleChange}/>
          <input 
            placeholder="password"
            name="password"
            type="password"
            autoComplete="Off"
            value={this.state.password}
            onChange={this.handleChange}/>
          {/* <input 
            name="email"
            type="text"
            autoComplete="Off"
            value={this.state.email}
            onChange={this.handleChange}/>
          <div> 
            <p>is Admin ?</p>
            <input 
              name="isAdmin"
              type="checkbox"
              checked={this.state.isAdmin}
              onChange={this.handleChangeBox}/>
          </div> */}
          <input 
            type="submit"
            value="ok"/>
        </form>
        {this.state.status && <p>{this.state.status === 200 ? 'changes made' : 'there was a problem'} {this.state.status}</p>}
      </div>  
    );
  }
  
}

export default UserMod;
