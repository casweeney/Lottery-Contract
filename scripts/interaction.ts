import { ethers } from "hardhat";

const main = async () => {

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = Lottery.attach("0x49a0954Df032800F3A8CfE952f18bD61f3493e0E");

    // const startGame = await lottery.startGame(2, ethers.utils.parseEther("0.001"));
    // const startGameTxnReciept = await startGame.wait();
    // console.log("Game started: ", startGameTxnReciept);

    // const joinGame = await lottery.joinGame({ value: ethers.utils.parseEther("0.001")});
    // const joinGameTnxReceipt = await joinGame.wait();
    // console.log("Game joined: ", joinGameTnxReceipt);

    const joinGame2 = await lottery.joinGame({ value: ethers.utils.parseEther("0.001")});
    const joinGameTnxReceipt2 = await joinGame2.wait();
    console.log("User2 Game joined: ", joinGameTnxReceipt2);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});