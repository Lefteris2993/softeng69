import React from 'react';
import './startheader.scss'

class Startheader extends React.Component {
    render() {
        return (
            <nav className="HeaderItems">
                <h1 className="logo">
                    <i className="fas fa-plug">  Eos   </i>
                    <i className="greeting"> Welcome, please login!</i>
                </h1>
            </nav>
        );
    }
}

export default Startheader;