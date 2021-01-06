import React from 'react';
import axios from 'axios';

class HealthCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
      message: ''
    }
    this.onClick = this.onClick.bind(this);
    console.log(this.props)
  }

  onClick (event) {
    axios({
      method: 'get',
      url: 'https://localhost:8765/evcharge/api/admin/healthcheck',
      headers: {
        'x-observatory-auth': this.props.token
      }
    }).then( result => {
      this.setState({ reply: true });
      if (result.status === 200) {
        this.setState({message: 'everything is working fine'});
      } else {
        this.setState({ message: 'these was a problem connecting to the database ' + result.status });
      }
    }).catch( err => {
      console.log(err);
      this.setState({ reply: true, message: 'there was an error 418' });
    })
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <p>Press the button to check connectivity</p>
        <button onClick={this.onClick}>Check</button>
        {this.state.reply && <p>{this.state.message}</p>}
      </div>
    );
  }
  
}

export default HealthCheck;
