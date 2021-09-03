import React, { Component } from 'react';

class InternetBillboard extends Component {
    static async getInitialProps(ctx) {
        return {};
    }

    render() {
        return (
            <h1>Hey ya!</h1>
        );
    }
}

export default InternetBillboard;