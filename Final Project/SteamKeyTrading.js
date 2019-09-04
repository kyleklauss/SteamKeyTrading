let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "keyHash1",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "postKey",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "key2",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "key1",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "want",
                "type": "string"
            },
            {
                "name": "have",
                "type": "string"
            }
        ],
        "name": "postTrade",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "s",
                "type": "string"
            }
        ],
        "name": "helper",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "validation",
                "type": "bool"
            }
        ],
        "name": "confirm",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "key",
                "type": "string"
            }
        ],
        "name": "trade",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "gameWant",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "gameHave",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "keyHash2",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "keyHash",
                "type": "bytes32"
            }
        ],
        "name": "preTrade",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "k",
                "type": "string"
            }
        ],
        "name": "opposingKey",
        "type": "event"
    }
]


let SteamKeyTradingContractFactory = web3.eth.contract (abi);
// Deploy SimpleCoin on Ganache CLI with a deployment script and place the contract address below:
let SteamKeyContractInstance = SteamKeyTradingContractFactory.at ("0x0f2e2cc0c82a5f5b5b73f24361b6149380157c7a");
let x = 0;
let games = {};
let searchedGames = {};


function setAccountNumber() {
    x = $("setAccountNumber").val();
}

function generateSearchGamesTable(){
    let innerHtml = "<tr><td>Looking For</td><td>Can Trade</td>";
    for (let key in searchedGames) {
        let want = searchedGames[key];
        let has = key;
        innerHtml = innerHtml + "<tr><td>" + want + "</td><td>" + has + "</td></tr>";
    }
    $ ("#trades").html (innerHtml);
}

function refreshTradeTable(){
    let innerHtml = "<tr><td>Looking For</td><td>Can Trade</td>";
    for (let key in games) {
        let want = games[key];
        let has = key;
        innerHtml = innerHtml + "<tr><td>" + want + "</td><td>" + has + "</td></tr>";
    }
    $ ("#trades").html (innerHtml);
}


function setGames() {
    let gameWanted = $("#want").val();
    let gameHas = $("#has").val();
    games[gameHas] = gameWanted;
    SteamKeyContractInstance.postTrade (
        gameWanted,
        gameHas,
        { from: web3.eth.accounts[0],
        gas: 200000},
        function (error, result) {
            if (!error) {
                refreshTradeTable();
            } else {
                console.error (error);
            }
        }
    );
}

function searchGames() {
    searchedGames = {};
    let gameSearch = $("#keyword").val();

    for (let key in games) {
        if (games[key] == gameSearch) {
             searchedGames[key] = games[key];
        }
    }
    generateSearchGamesTable();
}

function submitHash() {
    let hash = $("#hash").val();
    SteamKeyContractInstance.preTrade(
        hash,
        { from: web3.eth.accounts[0],
            gas: 200000},
        function(error, result) {
            if (!error)
                window.alert("Hash submitted, submit hash to email k.klauss99@gmail.com for verification of both parties");
            else
                console.error(error);
        }
    );
}

function sendTrue() {
    SteamKeyContractInstance.confirm(
        true,
        { from: web3.eth.accounts[x],
            gas: 200000},
        function(error, result) {
            if (!error)
                window.alert("Successfully Verified");
            else
                console.error(error);
        }
    );

}

function sendFalse() {
    SteamKeyContractInstance.confirm(
        true,
        { from: web3.eth.accounts[x],
            gas: 200000},
        function(error, result) {
            if (!error)
                console.log("Unsucessfully Verified");
            else
                console.error(error);
        }
    );
}

function requestKey() {
    let eventListener = SteamKeyContractInstance.opposingKey();
    SteamKeyContractInstance.postKey(
        { from: web3.eth.accounts[x],
            gas: 200000},
        function(error, result) {
            if (!error)
                window.alert(eventListener);
            else
                console.error(error);
        }
    );
}

function submitKey() {
    let key = $("#key").val();
    SteamKeyContractInstance.trade(
        key,
        { from: web3.eth.accounts[x],
            gas: 200000},
        function(error, result) {
            if (!error)
                requestKey();
            else
                console.error(error);
        }
    );
    let count = 1;
    for(let k in games) {
        if (games[k] == key)
            document.getElementById("#trades").deleteRow(count);
        count++;
    }

}







