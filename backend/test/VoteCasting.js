const VoteCasting = artifacts.require("VoteCasting");

contract("VoteCasting", (accounts) => {
  let voteCasting;

  before(async () => {
    voteCasting = await VoteCasting.deployed();
  });

  it("should allow registered voters to cast votes", async () => {
    // Assume that account[1] is a registered voter
    const voterChoice = "Candidate A";

    await voteCasting.castVote(voterChoice, { from: accounts[1] });

    const encryptedVote = await voteCasting.getEncryptedVote(accounts[1]);
    assert.equal(encryptedVote, true, "Vote not casted correctly");
  });

  it("should allow authorized parties to decrypt and verify votes", async () => {
    // Assume that account[2] is an authorized party (like an election official)
    const voterAddress = accounts[1];
    const decryptedVote = await voteCasting.getDecryptedVote(voterAddress, { from: accounts[2] });

    assert.equal(decryptedVote, "Candidate A", "Decrypted vote is incorrect");
  });

  it("should allow voters to reveal their votes", async () => {
    const preCommittedValue = "RevealedVote123";
    await voteCasting.revealVote(preCommittedValue, { from: accounts[1] });

    const revealedVote = await voteCasting.getRevealedVote(accounts[1]);
    assert.equal(revealedVote, preCommittedValue, "Vote not revealed correctly");
  });

  it("should retrieve the aggregated vote count for each candidate", async () => {
    const candidateACount = await voteCasting.getVoteCount("Candidate A");
    assert.equal(candidateACount.toNumber(), 1, "Vote count for Candidate A is incorrect");

    // Similarly, check vote counts for other candidates
  });

  it("should prevent further vote casting after the end of voting", async () => {
    // Assume that account[3] is an authorized party (e.g., an election official)
    await voteCasting.endVoting({ from: accounts[3] });

    try {
      await voteCasting.castVote("Candidate B", { from: accounts[1] });
      assert.fail("Expected an exception but none was thrown");
    } catch (error) {
      assert(error.message.includes("Voting has ended"), "Unexpected error message");
    }
  });
});
