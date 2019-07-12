const Proxy = artifacts.require("Proxy");
const fs = require('fs');

module.exports = function(deployer) {
    deployer.deploy(Proxy)
    .then(() => {
        if (Proxy._json) {
            fs.writeFile('deployedABI', JSON.stringify(Proxy._json.abi),
                (err) => {
                    if (err) throw err;
                    console.log("파일에 ABI 입력 성공");
                }
            )
            fs.writeFile('deployedAddress', Proxy.address,
                (err) => {
                    if (err) throw err;
                    console.log("파일에 주소 입력 성공");
                }
            )
        }
    });
};
