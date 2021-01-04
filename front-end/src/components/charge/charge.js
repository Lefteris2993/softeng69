import React from "react";
import "./charge.scss";

class Charge extends React.Component {
    constructor(props) {
        super(props);
        this.state = { vehicle: '', method: '' };
        this.handleChargePress = this.handleChargePress.bind(this);
    }
    handleChargePress(event){

    }
    render() {
        return (
            <div className="outer-container">
                {console.log(sessionStorage)}
                Select your vehicle
                Pick a charging method
                <button
                    type="button"
                    className="charge-btn"
                    onClick={this
                        .handleChargePress}>Charge now!</button>
            </div>
        )
    }
}

export default Charge;