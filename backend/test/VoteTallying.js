const VoteTallying = artifacts.require("VoteTallying");

contract("VoteTallying", (accounts) => {
  let voteTallying;

  before(async () => {
    voteTallying = await VoteTallying.deployed();
  });

  it("should allow authorized parties to submit encrypted votes", async () => {
    // Assume that account[1] is an authorized party (e.g., an election official)
    const encryptedVotes = ["encryptedVote1", "encryptedVote2"];

    await voteTallying.submitEncryptedVotes(encryptedVotes, { from: accounts[1] });

    const submittedVotes = await voteTallying.getSubmittedVotes(accounts[1]);
    assert.equal(submittedVotes.length, 2, "Encrypted votes not submitted correctly");
  });

  it("should decrypt and tally votes for each candidate", async () => {
    // Assume that account[2] is an authorized party (e.g., an election official)
    const candidateA = "Candidate A";
    const candidateB = "Candidate B";

    await voteTallying.decryptAndTallyVotes(candidateA, { from: accounts[2] });
    await voteTallying.decryptAndTallyVotes(candidateB, { from: accounts[2] });

    const voteCountA = await voteTallying.getVoteCount(candidateA);
    const voteCountB = await voteTallying.getVoteCount(candidateB);

    assert.equal(voteCountA.toNumber(), 1, "Vote count for Candidate A is incorrect");
    assert.equal(voteCountB.toNumber(), 1, "Vote count for Candidate B is incorrect");
  });

  it("should declare the winner based on the highest vote count", async () => {
    // Assume that account[3] is an authorized party (e.g., an election official)
    const winner = await voteTallying.declareWinner({ from: accounts[3] });

    assert.equal(winner, "Candidate A", "Winner declaration is incorrect");
  });
});
