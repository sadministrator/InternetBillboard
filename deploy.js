const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledBillboard = require('./ethereum/build/InternetBillboard.json');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const infura_endpoint = process.env.INFURA_ENDPOINT;

const provider = new HDWalletProvider(
    mnemonic,
    infura_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const inbox = await new web3.eth
        .Contract(
            JSON.parse(compiledBillboard.interface)
        )
        .deploy({
            data: compiledBillboard.bytecode,
            arguments: ['Hello Rinkeby!']
        })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', inbox.options.address);
};
deploy();