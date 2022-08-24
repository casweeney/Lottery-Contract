import { ethers } from "hardhat";
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function main() {
  const Lottery = await ethers.getContractFactory("Lottery");
  
  const lottery = await Lottery.deploy(VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE);

  await lottery.deployed();

  console.log("Lottery Contract Address:", lottery.address);
  /// Lottery contract address on Mumbai: 0x49a0954Df032800F3A8CfE952f18bD61f3493e0E
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
