const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { beforeEach, describe, it } = require('mocha');

const web3 = new Web3(ganache.provider());
const compiledBillboard = require('../ethereum/build/InternetBillboard.json');

let accounts;
let inbox;
let defaultMessage;
let newMessage;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  defaultMessage = 'Hello world!';
  newMessage = 'Goodbye world!';

  inbox = await new web3.eth.Contract(compiledBillboard.abi)
    .deploy({
      data: compiledBillboard.evm.bytecode.object,
      arguments: [defaultMessage],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(defaultMessage, message);
  });

  it('can set message', async () => {
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(newMessage, message);
  });
});
