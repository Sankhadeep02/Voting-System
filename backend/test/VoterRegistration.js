const VoterRegistration = artifacts.require("VoterRegistration");

contract("VoterRegistration", (accounts) => {
  let voterRegistration;

  before(async () => {
    voterRegistration = await VoterRegistration.deployed();
  });

  it("should register a voter", async () => {
    const voterName = "Alice";
    const voterAge = 25;

    await voterRegistration.registerVoter(voterName, voterAge, { from: accounts[1] });

    const voterInfo = await voterRegistration.getVoterInfo(accounts[1]);
    assert.equal(voterInfo[0], voterName, "Voter name not registered correctly");
    assert.equal(voterInfo[1].toNumber(), voterAge, "Voter age not registered correctly");
    assert.equal(voterInfo[2], true, "Voter should be registered");
  });

  it("should update voter information", async () => {
    const updatedName = "Alicia";
    const updatedAge = 26;

    await voterRegistration.updateVoterInfo(updatedName, updatedAge, { from: accounts[1] });

    const voterInfo = await voterRegistration.getVoterInfo(accounts[1]);
    assert.equal(voterInfo[0], updatedName, "Voter name not updated correctly");
    assert.equal(voterInfo[1].toNumber(), updatedAge, "Voter age not updated correctly");
  });

  it("should unregister a voter", async () => {
    await voterRegistration.unregisterVoter({ from: accounts[1] });

    const voterInfo = await voterRegistration.getVoterInfo(accounts[1]);
    assert.equal(voterInfo[2], false, "Voter should be unregistered");
  });
});
