// SPDX-License-Identifier: GPL-3.0


pragma solidity ^0.4.25;

contract ElectionFact {
    
    struct ElectionDet {
        address deployedAddress;
        string el_n;
        string el_d;
    }
    
    mapping(string=>ElectionDet) companyElection;
    
    function createElection(string memory electionId,string memory election_name, string memory election_description) public{
        //address newElection = new Election(msg.sender , election_name, election_description);
        address newElection = new Election();
        
     companyElection[electionId].deployedAddress = newElection;
     companyElection[electionId].el_n = election_name;
     companyElection[electionId].el_d = election_description;
    }
    
    function getDeployedElection(string memory electionId) public view returns (address,string,string) {
        address val =  companyElection[electionId].deployedAddress;
        if(val == 0) 
            return (0,"","Create an election.");
        else
            return  (companyElection[electionId].deployedAddress,companyElection[electionId].el_n,companyElection[electionId].el_d);
    }
}

contract Election {

    //election_authority's address
    address election_authority;
    string election_name;
    string election_description;
    bool status;
    bool private initialized;
    
    //election_authority's address taken when it deploys the contract
    // constructor(address authority , string name, string description) public {
    //     election_authority = authority;
    //     election_name = name;
    //     election_description = description;
    //     status = true;
    // }

    // Initialization function that sets the contract's state variables
    function initialize(address authority, string memory name, string memory description) public {
        require(!initialized, "Error: Contract already initialized.");
        require(msg.sender == authority, "Error: Only the election authority can initialize the contract.");
        election_authority = authority;
        election_name = name;
        election_description = description;
        status = true;
        initialized = true;
    }

    //Only election_authority can call this function
    modifier owner() {
        require(msg.sender == election_authority, "Error: Access Denied.");
        _;
    }
    //candidate election_description

    struct Candidate {
        string candidate_name;
        string candidate_description;
        string imgHash;
        uint8 voteCount;
        string electionId;
    }

    //candidate mapping

    mapping(uint8=>Candidate) public candidates;

    //voter election_description

    struct Voter {
        uint8 candidate_id_voted;
        bool voted;
    }

    //voter mapping

    mapping(string=>Voter) voters;

    //counter of number of candidates

    uint8 numCandidates;

    //counter of number of voters

    uint8 numVoters;

    //function to add candidate to mapping

    function addCandidate(string memory candidate_name, string memory candidate_description, string memory imgHash,string memory electionId) public owner {
        uint8 candidateID = numCandidates++; //assign id of the candidate
        candidates[candidateID] = Candidate(candidate_name,candidate_description,imgHash,0,electionId); //add the values to the mapping
    }
    //function to vote and check for double voting

    function vote(uint8 candidateID,string voterId) public {

        //if false the vote will be registered
        require(!voters[voterId].voted, "Error:You cannot double vote");
        
        voters[voterId] = Voter (candidateID,true); //add the values to the mapping
        numVoters++;
        candidates[candidateID].voteCount++; //increment vote counter of candidate
        
    }

    //function to get count of candidates

    function getNumOfCandidates() public view returns(uint8) {
        return numCandidates;
    }

    //function to get count of voters

    function getNumOfVoters() public view returns(uint8) {
        return numVoters;
    }

    //function to get candidate information

    function getCandidate(uint8 candidateID) public view returns (string memory, string memory, string memory, uint8,string memory) {
        return (candidates[candidateID].candidate_name, candidates[candidateID].candidate_description, candidates[candidateID].imgHash, candidates[candidateID].voteCount, candidates[candidateID].electionId);
    } 

    //function to return winner candidate information

    function winnerCandidate() public view owner returns (uint8) {
        uint8 largestVotes = candidates[0].voteCount;
        uint8 candidateID;
        for(uint8 i = 1;i<numCandidates;i++) {
            if(largestVotes < candidates[i].voteCount) {
                largestVotes = candidates[i].voteCount;
                candidateID = i;
            }
        }
        return (candidateID);
    }
    
    function getElectionDetails() public view returns(string, string) {
        return (election_name,election_description);    
    }
}