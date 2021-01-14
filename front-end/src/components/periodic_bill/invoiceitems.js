import React from "react";
import "./bill.scss";



class InvoiceItemsTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const tabledata = [
            {
                "session_id": "1",
                "date": "3/10/2018",
                "energy": "657",
                "money": "20"
            },
            {
                "session_id": "2",
                "date": "5/11/2018",
                "energy": "900",
                "money": "100"
            },
            {
            }
        ];

        let session_sum = tabledata.length - 1;

        function sum(obj, mode) {
            let sum = 0;
            if (mode == "energy") {
                for (let i = 0; i < obj.length - 1; i++) {
                    sum += parseInt(tabledata[i].energy);
                }
            }
            else {
                for (let i = 0; i < obj.length - 1; i++) {
                    sum += parseInt(tabledata[i].money);
                }
            }
            return sum;
        }

        return (
            <div class="bill-table" >
                <div >
                    <table aria-label="Bill">
                        <thead>
                            <tr >
                                <th className="table-headers" role="columnheader" scope="col">Session No</th>
                                <th className="table-headers" role="columnheader" scope="col">Date</th>
                                <th className="table-headers" role="columnheader" scope="col">Energy Consumed (kW)</th>
                                <th className="table-headers" role="columnheader" scope="col">Amount (€)</th>
                            </tr>
                        </thead>
                        <tbody>

                            {tabledata.map(obj => {
                                return (
                                    <tr key={obj.session_id}>
                                        <th className="row-headers" scope="row">{obj.session_id}</th>
                                        <td className="body-elem" >{obj.date}</td>
                                        <td className="body-elem">{obj.energy}</td>
                                        <td className="body-elem">{obj.money}</td>
                                    </tr>
                                );
                            })
                            }

                        </tbody>
                        <tfoot>
                            <tr className="table-sums">
                                <th className="footer-header" scope="row">{"Total sessions (" + session_sum + ")"}</th>
                                <td className="body-footer" >{"-"}</td>
                                <td className="body-footer">{sum(tabledata, "energy")}</td>
                                <td className="body-footer">{sum(tabledata, "money")}</td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div >
        )
    }
}

export default InvoiceItemsTable;