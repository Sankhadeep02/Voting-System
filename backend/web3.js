import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.ethereum) {
  // Check if MetaMask is installed and the 'ethereum' object is available
  window.ethereum.enable()
    .then(() => {
      web3 = new Web3(window.ethereum);
      console.log('Web3: ', web3);
    })
    .catch((error) => {
      console.error('Error enabling MetaMask:', error);
      // Handle the error or provide feedback to the user
    });
} else {
  // If MetaMask is not available, an error message to handle the situation
  console.error('MetaMask is required to use this application.');

}

export default web3;
