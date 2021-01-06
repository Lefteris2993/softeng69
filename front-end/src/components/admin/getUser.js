import axios from 'axios';
import React from 'react';

class GetUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      data: null,
      status: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.printData = this.printData.bind(this);
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit (event) {
    axios({
      method: 'get',
      url: 'https://localhost:8765/evcharge/api/admin/users/'+this.state.username,
      headers: {
        'x-observatory-auth': this.props.token
      }
    }).then( result => {
      this.setState({ data: result.data, status: result.status });
    }).catch( error =>{
      console.log(error);
      this.setState({ status: 418 })
    })
    event.preventDefault();
  }

  printData () {
    console.log(this.state.data)
    if (this.state.status == null){
      console.log(1);
      return <></>
    }
    if (this.state.status !== 200) {
      return <p>there was an error {this.state.status}</p>
    }
    var obj = this.state.data;
    var ret = [];
    var i = 0;
    for (var key in obj) {
      var value = obj[key];
      ret.push(<li key={i++}>{key} {String(value)}</li>)
    }
    return ret;
  }

  render () {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}>
          <p>get user info</p>
          <input 
            placeholder="username"
            name="username"
            type="text"
            autoComplete="Off"
            value={this.state.username}
            onChange={this.handleChange}/>
          <input 
            type="submit"
            value="ok"/>
        </form>
        {this.printData()}
      </div>
    );
  }
  
}

export default GetUser;
