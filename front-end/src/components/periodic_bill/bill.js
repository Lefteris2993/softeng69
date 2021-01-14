import React from 'react';
import "./bill.scss";
import { InvoiceTitle } from './invoicetitle';
import { InvoiceNo } from './invoiceno';
import { BillTo } from './billto';
import InvoiceItemsTable from './invoiceitems'


class Bill extends React.Component {

    render() {
        return (
            <div className="bill-page">
                <div className="view-history">
                    <button type="submit" className="history-btn">
                        <i class="fas fa-history fa-3x"></i>
                        <span>History</span>
                    </button>
                </div>
                <div className="page">
                    <div className="main-logo" ><i className="fas fa-plug">  Eos</i></div>
                    <InvoiceTitle title='Your Bimonthly Bill' />
                    <InvoiceNo />
                    <BillTo />
                    <InvoiceItemsTable />
                </div>
            </div>
        )
    }
}

export default Bill;