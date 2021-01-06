import React from 'react';
import { Link } from 'react-router-dom';

class AdminNav extends React.Component {
  constructor(props) {
    super(props);
    console.log (this.props);
  }

  render () {
    return (
      <ul>
          <Link to={`${this.props.match.path}/healthcheck`}>healthcheck</Link> | 
          <Link to={`${this.props.match.path}/usermod`}>usermod</Link> |
          <Link to={`${this.props.match.path}/getuser`}>getuser</Link> |
          <Link to={`${this.props.match.path}/resetsessions`}>resetsessions</Link> |
          <Link to={`${this.props.match.path}/sessionsupd`}>sessionsupd</Link>
      </ul>
    );
  }
  
}

export default AdminNav;
