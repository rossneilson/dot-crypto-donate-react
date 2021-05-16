"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchContractData = fetchContractData;
exports.donateWithEther = donateWithEther;

require("core-js/modules/es.array-buffer.slice.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.promise.js");

var _ethers = require("ethers");

var _jsSha = require("js-sha3");

function nameHash(name) {
  const hashArray = hash(name);
  return arrayToHex(hashArray);
}

function hash(name) {
  if (!name) {
    return new Uint8Array(32);
  }

  const [label, ...remainder] = name.split(".");

  const labelHash = _jsSha.keccak_256.array(label);

  const remainderHash = hash(remainder.join("."));
  return _jsSha.keccak_256.array(new Uint8Array([...remainderHash, ...labelHash]));
}

function arrayToHex(arr) {
  return "0x" + Array.prototype.map.call(arr, x => ("00" + x.toString(16)).slice(-2)).join("");
}

const address = "0xa6E7cEf2EDDEA66352Fd68E5915b60BDbb7309f5";
const keys = ["crypto.BTC.address", "crypto.ETH.address"];
const abi = [{
  constant: true,
  inputs: [{
    internalType: "string[]",
    name: "keys",
    type: "string[]"
  }, {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256"
  }],
  name: "getData",
  outputs: [{
    internalType: "address",
    name: "resolver",
    type: "address"
  }, {
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    internalType: "string[]",
    name: "values",
    type: "string[]"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}]; // Todo - Add more ccy and make parameter

const ccys = ["BTC", "ETH"];

async function fetchContractData(cryptoDomain, infuraApi) {
  const provider = new _ethers.ethers.providers.InfuraProvider("homestead", infuraApi);
  const contract = new _ethers.ethers.Contract(address, abi, provider);
  const result = {};
  const contractData = await contract.getData(keys, nameHash(cryptoDomain));
  contractData.forEach((address, index) => result[ccys[index]] = address);
  return result;
}

async function donateWithEther(address, amount) {
  try {
    if (amount <= 0) {
      throw {
        message: "Enter value above 0"
      };
    }

    const provider = new _ethers.ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer.sendTransaction({
      from: await signer.getAddress(),
      to: address,
      value: _ethers.ethers.utils.parseEther(amount)
    });
  } catch (err) {
    throw err;
  }
}