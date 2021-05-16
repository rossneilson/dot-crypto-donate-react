# .crypto Domain Donate Button React Component
[![npm (tag)](https://img.shields.io/npm/v/dot-crypto-donate-react)](https://www.npmjs.com/package/dot-crypto-donate-react)

A react component that takes in a .crypto domain name and allows for donations to be sent to addresses associated with the domain.

If you want to add more currencies or other improvements please feel free to raise a PR. Or add examples to the readme.

## Features 
* Simply add .crypto domain name as prop to get all addresses
* Web3 (ethers.js) integration for automatic payments via ethereum wallet ([metaMask](https://metamask.io), etc)
* Currently only supports ETH and BTC (main functionality for ETH)
* If successful links to transaction on [etherscan](https://etherscan.io)
* Customizable colours and text
* MIT License - completely open source to do with as you please

## Pre-requisites / Requirements
* Purchase, claim and add addresses to (unstoppable domains)[https://unstoppabledomains.com/]
* Create free infura account at (infura.io)[https://infura.io/] then add project key as prop

## Examples 
[rossneilson.dev (bottom of site)](https://rossneilson.dev)


-------
## Instructions

**npm**

```
npm install --save dot-crypto-donate-react
```

**Import in react**

```
import CryptoDonate from "dot-crypto-donate-react"
```

**Use**

```
<CryptoDonate
  cryptoDomain="<insert-domain>.crypto"
  infuraApi="<insert-infura-api>"
  colors={{
    primary: "#2096f3",
    secondary: "#fde199",
    button: "#1a78c2",
    text: "#ffffff",
  }}
  text={{
    title: "Donate",
    thanks: "Thank you for donating, see the below link for transaction",
    copied: "Address copied, please donate via wallet",
  }}
/>
```

-------
## License

MIT License.

This package is not associated with unstoppable domains.