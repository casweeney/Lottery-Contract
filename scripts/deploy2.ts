import { ethers } from "hardhat";
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const Lottery = await ethers.getContractFactory("LotteryNoVRF");
  
  const lottery = await Lottery.deploy();

  await lottery.deployed();

  console.log("Lottery without VRF Contract Address:", lottery.address);
  /// Contract deployed on Goerli at: 0x7DDA7CAda64c9848fa9085E0ce29E68d4D2725aC
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
