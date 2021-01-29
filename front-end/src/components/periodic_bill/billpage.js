import React from 'react';
import "./bill.scss";
import { InvoiceTitle } from './invoicetitle';
import { InvoiceNo } from './invoiceno';
import { BillTo } from './billto';
import InvoiceItemsTable from './invoiceitems';

class BillPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
    <div className="page">
        <div className="main-logo" ><i className="fas fa-plug">  Eos</i></div>
        <InvoiceTitle title='Your Bimonthly Bill' />
        <InvoiceNo />
        <BillTo />
        <InvoiceItemsTable dataFromPage = {this.props.dataFromBill}/>
    </div>
        )
    }
}

export default BillPage;