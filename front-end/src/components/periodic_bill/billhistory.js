import React from "react";
import "./bill.scss";
import { InvoiceTitle } from "./invoicetitle";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class BillHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    // const d = new Date(2010, 7, 5);
    // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    // const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    // const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    // console.log(`${da}-${mo}-${ye}`);
    render() {
        return (
            <div className="page">
                <InvoiceTitle title='Your Bill Payment History' />
                <ReactTable
                    className="history-table"
                    data={this.props.dataFromBill}
                    columns={[
                        {
                            Header: "Months",
                            accessor: "date",
                            minWidth: 300
                        },
                        {
                            Header: "Total Amount",
                            accessor: "money",
                            minWidth: 300
                        }
                    ]}
                />
            </div>
        )
    }
}

export default BillHistory;