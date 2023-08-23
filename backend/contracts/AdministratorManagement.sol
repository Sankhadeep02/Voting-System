// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdministratorManagement {
    address public owner;
    
    enum AdministratorRole {
        Observer,
        Manager,
        SuperAdmin
    }
    
    struct Administrator {
        AdministratorRole role;
        bool isActive;
    }
    
    mapping(address => Administrator) public administrators;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAdministrator() {
        require(administrators[msg.sender].isActive, "Only administrators can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        administrators[owner].role = AdministratorRole.SuperAdmin;
        administrators[owner].isActive = true;
    }

    function addAdministrator(address _adminAddress, AdministratorRole _role) public onlyOwner {
        require(!administrators[_adminAddress].isActive, "Administrator already exists");
        
        administrators[_adminAddress].role = _role;
        administrators[_adminAddress].isActive = true;
    }

    function removeAdministrator(address _adminAddress) public onlyOwner {
        require(administrators[_adminAddress].isActive, "Administrator not found");
        
        delete administrators[_adminAddress];
    }

    function setAdministratorRole(address _adminAddress, AdministratorRole _newRole) public onlyOwner {
        require(administrators[_adminAddress].isActive, "Administrator not found");
        
        administrators[_adminAddress].role = _newRole;
    }

    function getAdministratorInfo(address _adminAddress) public view returns (AdministratorRole, bool) {
        Administrator memory admin = administrators[_adminAddress];
        return (admin.role, admin.isActive);
    }
}