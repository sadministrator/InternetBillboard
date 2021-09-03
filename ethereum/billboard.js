import web3 from './web3';
import compiledBillboard from './build/InternetBillboard.json';

const billboard = new web3.eth.Contract(
    JSON.parse(compiledBillboard.interface),
    process.env.BILLBOARD_ADDRESS
);

export default billboard;