import React from 'react';
import "./bill.scss";
import BillHistory from './billhistory';
import BillPage from './billpage';


class Bill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: false,
            data: [
                {
                    "session_id": "1",
                    "date": "3/11/2018",
                    "energy": "657",
                    "money": "20"
                },
                {
                    "session_id": "2",
                    "date": "5/12/2018",
                    "energy": "900",
                    "money": "100"
                },
                {
                }
            ]
        }
        this.handleHistoryPress = this.handleHistoryPress.bind(this);
    }

    handleHistoryPress(event) {
        this.setState({ history: !this.state.history });
    }

    render() {
        return (
            <div className="bill-page">
                <div className="view-history">
                    <button type="submit"
                        className="history-btn"
                        onClick={this
                            .handleHistoryPress}>
                        {this.state.history ?
                            <i class="fas fa-long-arrow-alt-left fa-3x"></i>
                            :
                            <i class="fas fa-history fa-3x"></i>
                        }
                        <span>{this.state.history ? "Back" : "History"}</span>
                    </button>
                </div>
                <div>
                    {this.state.history ?
                        <BillHistory dataFromBill={this.state.data}/> :
                        <BillPage dataFromBill={this.state.data} />
                    }
                </div>
            </div>
        )
    }
}

export default Bill;