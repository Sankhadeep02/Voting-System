import web3 from './web3'; // Assuming './web3' provides a configured Web3.js instance
import Election from './Build/Election.json'; // Import the contract ABI JSON

// Export a function that creates an instance of the Election contract
export default function createElectionContract(address) {
    // Create and return a new contract instance
    return new web3.eth.Contract(
        JSON.parse(Election.interface), // Parse the contract ABI
        address // The address of the deployed contract
    );
}
