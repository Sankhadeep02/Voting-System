const AdministratorManagement = artifacts.require("AdministratorManagement");

contract("AdministratorManagement", (accounts) => {
  let adminManagement;

  before(async () => {
    adminManagement = await AdministratorManagement.deployed();
  });

  it("should allow the owner to add a new administrator", async () => {
    const newAdmin = accounts[1];

    await adminManagement.addAdministrator(newAdmin, { from: accounts[0] });

    const isAdmin = await adminManagement.isAdmin(newAdmin);
    assert.isTrue(isAdmin, "New administrator not added correctly");
  });

  it("should allow the owner to remove an existing administrator", async () => {
    const existingAdmin = accounts[1];

    await adminManagement.removeAdministrator(existingAdmin, { from: accounts[0] });

    const isAdmin = await adminManagement.isAdmin(existingAdmin);
    assert.isFalse(isAdmin, "Existing administrator not removed correctly");
  });

  it("should allow the owner to change an administrator's role", async () => {
    const adminToModify = accounts[2];
    const newRole = 2; // Assume role 2 corresponds to an elevated role

    await adminManagement.setAdministratorRole(adminToModify, newRole, { from: accounts[0] });

    const modifiedRole = await adminManagement.getAdministratorRole(adminToModify);
    assert.equal(modifiedRole, newRole, "Administrator role not changed correctly");
  });

  it("should retrieve information about a specific administrator", async () => {
    const adminToQuery = accounts[2];

    const adminInfo = await adminManagement.getAdministratorInfo(adminToQuery);

    assert.equal(adminInfo[0], adminToQuery, "Administrator address incorrect");
    assert.equal(adminInfo[1].toNumber(), 2, "Administrator role incorrect");
  });
});
