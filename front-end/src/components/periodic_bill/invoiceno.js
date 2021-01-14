
import React, { Fragment } from 'react';
import "./bill.scss";

function getCurrentDate(separator = '/') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}
export const InvoiceNo = () => (
    <Fragment>
        <div className="invoiceDateContainer">
            <div className="label">Date: </div>
            <div >
                {getCurrentDate()}
            </div>
        </div >
    </Fragment>
);

 