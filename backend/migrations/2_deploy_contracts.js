// const ElectionFact = artifacts.require("ElectionFact");
// const Election = artifacts.require("Election");

// module.exports = function(deployer) {
//   deployer.deploy(ElectionFact);
//   deployer.deploy();
// };

// const ElectionFact = artifacts.require("ElectionFact");
// const Election = artifacts.require("Election");

// module.exports = function(deployer) {
//   deployer.deploy(ElectionFact);

//   deployer.deploy(Election).then(async (electionInstance) => {
//     const authorityAddress = "0x..."; // Replace with the actual authority address
//     const electionName = "Your Election Name"; // Replace with the desired name
//     const electionDescription = "Your Election Description"; // Replace with the desired description
    
//     // Get the deployed Election instance
//     const electionContract = await Election.deployed();

//     // Call the initialization function to set the constructor arguments
//     await electionContract.initialize(authorityAddress, electionName, electionDescription);
//   });
// };


const ElectionFact = artifacts.require("ElectionFact");
const Election = artifacts.require("Election");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ElectionFact);

  // Deploy Election contract without constructor arguments
  deployer.deploy(Election).then(async (electionInstance) => {
    const authorityAddress = accounts[0]; // Replace with the actual authority address
    const electionName = "Your Election Name"; // Replace with the desired name
    const electionDescription = "Your Election Description"; // Replace with the desired description
    
    // Get the deployed Election instance
    const electionContract = await Election.deployed();

    // Call the initialization function to set the constructor arguments
    await electionContract.initialize(authorityAddress, electionName, electionDescription);
  });
};

