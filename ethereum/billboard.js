import web3 from './web3';
import compiledBillboard from './build/InternetBillboard.json';

const billboard = new web3.eth.Contract(
  compiledBillboard.abi,
  process.env.NEXT_PUBLIC_BILLBOARD_ADDRESS,
);

export default billboard;
