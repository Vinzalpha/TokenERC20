const MonToken = artifacts.require("MonToken");

module.exports = function(deployer) {
  deployer.deploy(MonToken, "Roger Federer Fan Token", "RF", 2, 21000000);
};
