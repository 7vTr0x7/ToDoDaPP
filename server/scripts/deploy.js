
const hre = require("hardhat");

async function main() {
  const TaskContract = await hre.ethers.getContractFactory("TaskContract");
  const taskContract = await TaskContract.deploy();

  await taskContract.deployed();

  console.log(
    `TaskContract Address : ${taskContract.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
