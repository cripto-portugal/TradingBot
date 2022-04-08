
const trader = require("../build/contracts/Trader");
const {
    Contract,
    Wallet,
    getDefaultProvider,
    utils
} = require('ethers')

// Replace 'Kovan' by any other network
const provider = getDefaultProvider('istanbul'); // check if it works


const jsonFile = [
    {
        "from": "ETH",
        "to": "DAI",
        "target": "400",
        "amount": "1"
    },
    {
        "from": "ETH",
        "to": "DAI",
        "target": "500",
        "amount": "2"
    }
];

/*
var Web3 = require('web3')
var Common = require('ethereumjs-common').default;

var web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'))
var BLOCKCHAIN = Common.forCustomChain(
    'mainnet',
    {
        name: 'Binance Smart Chain Mainnet',
        networkId: 56,
        chainId: 56,
        url: 'https://bsc-dataseed.binance.org/'
    },
    'istanbul',
);
*/

//var provider = web3;


function negociarToken() {
  (async() => {

    // Add Signer here
    // const signer = new Wallet('PRIVATEKEY_HERE', provider);
    const contract = new Contract('0x244e37a91Fb5D52072a03446227534C2eeE3818e', trader.abi, provider);

    // Uncomment if Signer is set
    // const contract = new Contract('0x244e37a91Fb5D52072a03446227534C2eeE3818e', trader.abi, signer);

    const currentPrice = await contract.getPrice(utils.parseEther(jsonFile[0].amount));
    if(currentPrice >= jsonFile.target) {
        await contract.sell()
    }
    console.log(currentPrice.toString());

  })
}

setInterval(negociarToken, 1800);
