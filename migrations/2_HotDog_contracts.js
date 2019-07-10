const fs = require('fs');
const HotDogToken = artifacts.require("HotDogToken");

module.exports = function(deployer) {
    deployer.deploy(HotDogToken)
    .then(() => {
        if (HotDogToken._json) {
            fs.writeFile('deployedABI', JSON.stringify(HotDogToken._json.abi),
                (err) => {
                    if (err) throw err;
                    console.log("파일에 ABI 입력 성공");
                }
            )
            fs.writeFile('deployedAddress', HotDogToken.address,
                (err) => {
                    if (err) throw err;
                    console.log("파일에 주소 입력 성공");
                }
            )
        }
    });
};
