import { ethers } from "ethers";
import { keccak_256 } from "js-sha3";

function nameHash(name) {
  const hashArray = hash(name);
  return arrayToHex(hashArray);
}

function hash(name) {
  if (!name) {
    return new Uint8Array(32);
  }
  const [label, ...remainder] = name.split(".");
  const labelHash = keccak_256.array(label);
  const remainderHash = hash(remainder.join("."));
  return keccak_256.array(new Uint8Array([...remainderHash, ...labelHash]));
}

function arrayToHex(arr) {
  return (
    "0x" +
    Array.prototype.map
      .call(arr, (x) => ("00" + x.toString(16)).slice(-2))
      .join("")
  );
}

const address = "0xa6E7cEf2EDDEA66352Fd68E5915b60BDbb7309f5";
const keys = ["crypto.BTC.address", "crypto.ETH.address"];
const abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: "string[]",
        name: "keys",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "values",
        type: "string[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Todo - Add more ccy and make parameter
const ccys = ["BTC", "ETH"];

export async function fetchContractData(cryptoDomain, infuraApi) {
  const provider = new ethers.providers.InfuraProvider("homestead", infuraApi);
  const contract = new ethers.Contract(address, abi, provider);

  const result = {};
  const contractData = await contract.getData(keys, nameHash(cryptoDomain));
  contractData.forEach((address, index) => (result[ccys[index]] = address));
  return result;
}

export async function donateWithEther(address, amount) {
  try {
    if (amount <= 0) {
      throw { message: "Enter value above 0" };
    }
    if (!window.ethereum) {
      throw { message: "No wallet found, please install metamask" };
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer.sendTransaction({
      from: await signer.getAddress(),
      to: address,
      value: ethers.utils.parseEther(amount),
    });
  } catch (err) {
    throw err;
  }
}
