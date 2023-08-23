// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoterRegistration {
    struct Voter {
        string name;
        uint256 age;
        bool isRegistered;
    }

    address public owner;
    mapping(address => Voter) public voters;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function registerVoter(string memory _name, uint256 _age) public {
        require(!voters[msg.sender].isRegistered, "Voter already registered");
        require(_age >= 18, "Voter must be at least 18 years old");

        voters[msg.sender] = Voter({
            name: _name,
            age: _age,
            isRegistered: true
        });
    }

    function getVoterInfo(address _voterAddress) public view returns (string memory, uint256, bool) {
        Voter memory voter = voters[_voterAddress];
        return (voter.name, voter.age, voter.isRegistered);
    }

    function updateVoterInfo(string memory _name, uint256 _age) public {
        require(voters[msg.sender].isRegistered, "Voter not registered");
        require(_age >= 18, "Voter must be at least 18 years old");

        voters[msg.sender].name = _name;
        voters[msg.sender].age = _age;
    }

    function unregisterVoter() public {
        require(voters[msg.sender].isRegistered, "Voter not registered");

        delete voters[msg.sender];
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

}