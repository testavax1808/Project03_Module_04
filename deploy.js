const hre = require("hardhat");

async function main() {
  // Get the Points smart contract
  const MY_ERC_token = await hre.ethers.getContractFactory("MY_ERC_Token");

  // Deploy it
  const erc = await MY_ERC_token.deploy();
  await erc.waitForDeployment();

  // Display the contract address
  console.log(`Points token deployed to ${erc.target}`);

}


// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
