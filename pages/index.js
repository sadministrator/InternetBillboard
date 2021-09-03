import React, { Component } from 'react';
import billboard from '../ethereum/billboard';

class InternetBillboard extends Component {
    static async getInitialProps(ctx) {
        const message = await billboard.methods.message().call();
        const image = await billboard.methods.image().call();

        return { message, image };
    }

    render() {
        return (
            <div>
                <p>{this.props.message}</p>
                <img src={this.props.image} />
            </div>
        );
    }
}

export default InternetBillboard;