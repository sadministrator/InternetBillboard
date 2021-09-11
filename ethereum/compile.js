const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const sourcePath = path.resolve(__dirname, 'contracts', 'InternetBillboard.sol');
const source = fs.readFileSync(sourcePath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'InternetBillboard.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);
fs.outputJsonSync(
  path.resolve(buildPath, 'InternetBillboard.json'),
  output.contracts['InternetBillboard.sol'].InternetBillboard,
);
