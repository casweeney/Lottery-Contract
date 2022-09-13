// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract LotteryNoVRF {
    uint public entryFee;
    uint public maxPlayers;
    bool public gameStarted;
    uint public gameId;

    address payable[] public players;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function startGame(uint _maxPlayers, uint _entryFee) external {
        require(gameStarted == false, "Game currently running");
        delete players;
        maxPlayers = _maxPlayers;
        entryFee = _entryFee;
        gameId += 1;
        gameStarted = true;
    }

    function joinGame() external payable {
        require(gameStarted == true, "Game not started yet");
        require(msg.value == entryFee, "entry fee must be equal to entry fee");
        require(players.length < maxPlayers, "participants completed");
        players.push(payable(msg.sender));

        if(players.length == maxPlayers){
            getWinner();
        }
    }

    function getRandomWinner() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function getWinner() private {
        uint random = getRandomWinner() % players.length;
        payable(players[random]).transfer(address(this).balance);

        entryFee = 0;
        maxPlayers = 0;
        gameStarted = false;
        delete players;
    }

    receive() external payable {}

    function getContractBal() external view returns (uint) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "no funds in contract");

        payable(msg.sender).transfer(address(this).balance);
    }
}