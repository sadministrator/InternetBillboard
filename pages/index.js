import React, { Component } from 'react';
import billboard from '../ethereum/billboard';

class InternetBillboard extends Component {
    state = {
        message: '',
        image: '',
        creator: ''
    };

    static async getInitialProps(ctx) {
        const historyLength = await billboard.methods.getHistoryLength().call();

        const history = await Promise.all(
            Array(parseInt(historyLength)).fill().map((element, index) => {
                console.log('index: ', typeof (index));
                return billboard.methods.history(index).call();
            })
        );
        return { history };
    }

    constructor(props) {
        super(props);
        const { message, image, creator } = this.props.history[0];
        this.state = {
            message,
            image,
            creator
        };
    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
                <img src={this.state.image} />
            </div>
        );
    }
}

export default InternetBillboard;