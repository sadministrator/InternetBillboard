const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledBillboard = require('./build/InternetBillboard.json');
require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_ENDPOINT,
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const billboard = await new web3.eth
    .Contract(compiledBillboard.abi)
    .deploy({
      data: compiledBillboard.evm.bytecode.object,
      arguments: [
        'Hello Rinkeby!',
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Rinkeby_-_KMB_-_16000300030036.jpg',
      ],
    })
    .send({ gas: '3000000', from: accounts[0] });

  console.log('Contract deployed to', billboard.options.address);
};
deploy();
