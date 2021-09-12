import React, { Component } from 'react';
import billboard from '../ethereum/billboard';
import Header from '../components/Header';

class InternetBillboard extends Component {
    state = {
        index: 0,
    };

    static async getInitialProps(ctx) {
        const historyLength = await billboard.methods.getHistoryLength().call();

        const history = await Promise.all(
            Array(parseInt(historyLength)).fill().map((element, index) => {
                return billboard.methods.history(index).call();
            })
        );
        return { history, historyLength };
    }

    constructor(props) {
        super(props);
        const index = this.props.historyLength - 1;

        this.state = { index };
    }

    previous = event => {
        event.preventDefault();
        if (this.state.index > 0) {
            this.setState({ index: this.state.index - 1 })
        } else {
            alert('There is no billboard before this one.')
        }
    }

    next = event => {
        event.preventDefault();
        if (this.state.index < this.props.historyLength - 1) {
            this.setState({ index: this.state.index + 1 });
        } else {
            alert('There is no billboard after this one. Try posting a new one!')
        }
    }

    render() {
        const { history } = this.props;
        const { index } = this.state;

        return (
            <Header
                previous={this.previous}
                next={this.next}
                index={this.state.index}
                historyLength={this.props.historyLength}
            >
                <p>{history[index].message}</p>
                <img
                    src={history[index].image}
                    alt=''
                    style={{
                        minWidth: '30%',
                        maxWidth: '90%'
                    }}
                />
                <p>Creator: {history[index].creator}</p>
            </Header>
        );
    }
}

export default InternetBillboard;