import React from "react";
import "./charge.scss";
import CardPayment from "./cardpayment"

const dummy = {
    name: 'charging program A',
    price: 50.00
}

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
                <CardPayment product={dummy}/>
            </div>
        )
    }
}

export default Charge;