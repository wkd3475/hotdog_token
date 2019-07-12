const HotDogToken = artifacts.require("HotDogToken");

module.exports = function(deployer) {
    deployer.deploy(HotDogToken);
};
