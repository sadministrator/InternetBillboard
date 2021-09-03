const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const sourcePath = path.resolve(__dirname, 'contracts', 'InternetBillboard.sol');
const source = fs.readFileSync(sourcePath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);
fs.outputJsonSync(
    path.resolve(buildPath, 'InternetBillboard.json'),
    output[':InternetBillboard']
);