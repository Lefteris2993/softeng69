import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";
import "./charge.scss";

import "react-toastify/dist/ReactToastify.css";

toast.configure();
class CardPayment extends React.Component{
    constructor(props){
        super(props);
        this.handleToken = this.handleToken.bind(this)
    }

    async handleToken(token) {
        var product = this.props.product
        const response = await axios.post(
          config.apiUrl + '/checkout',
          { token, product }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
    }

    render() {
        return (
            <div className="container">
              <div className="product">
                <h1>{this.props.product.name}</h1>
                <h3>${this.props.product.price}</h3>
              </div>
              <StripeCheckout
                stripeKey="pk_test_51I6jr5GG9cBCL6SRp7ugYlpEuKZwyqNZOJNPf4XUcWOuHCdHaCg9eapDPHYpPZHhbSu8Kw4NT363ge2YzkGQVTdl00w7e8uFuk"
                token={this.handleToken}
                amount={this.props.product.price * 100}
                name={this.props.product.name}
              >
                  <button className="charge-btn">Pay with card</button>
              </StripeCheckout>
            </div>
          );
    }


}


export default CardPayment;