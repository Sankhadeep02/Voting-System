import web3 from './web3';
import ElectionFactoryArtifact from './Build/ElectionFact.json';

// Create an instance of the Election Factory contract
const electionFactoryInstance = new web3.eth.Contract(
  JSON.parse(ElectionFactoryArtifact.interface),
  '0xF5d3574DDc21D8Bd8bcB380de232cbbc8161234e'
);

// Export the contract instance as the default export of this module
export default electionFactoryInstance;
