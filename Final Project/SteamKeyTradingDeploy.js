const fs = require ("fs");
const solc = require ("solc");
const Web3 = require ("web3");
const web3 = new Web3 (new Web3.providers.HttpProvider ("http://localhost:9545"));
const compiledContract = solc.compile (fs.readFileSync ("SteamKeyTrading.sol", "utf-8"), 1);
//console.log (compiledContract);
const abi = compiledContract.contracts[":SteamKeyTrading"].interface;
const bytecode = "0x" + compiledContract.contracts[":SteamKeyTrading"].bytecode;
const gasEstimate = web3.eth.estimateGas({ data: bytecode }) + 100000;
const SteamKeyTradingContractFactory = web3.eth.contract (JSON.parse (abi));
const SteamKeyTradingInstance = SteamKeyTradingContractFactory.new ( {
    from: web3.eth.accounts[1],
    data: bytecode,
    gas: gasEstimate
}, function (e, instance) {
    // Note: called twice!
    console.log ("Callback");
    if (typeof instance.address !== "undefined") {
        console.log ("Contract mined!");
        console.log ("Contract address: " + instance.address);
        console.log ("Contract transaction hash: " + instance.transactionHash);
        fs.writeFileSync ("address.txt", instance.address, "utf-8");
        fs.writeFileSync ("abi.json", abi, "utf-8");
    } else {
        console.log ("Contract not created");
    }
});