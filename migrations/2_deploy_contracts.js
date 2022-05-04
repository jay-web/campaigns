const contracts = artifacts.require("CrowdFunding");


module.exports = function(deployer){
    deployer.deploy(contracts);
}