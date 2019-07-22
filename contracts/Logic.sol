pragma solidity ^0.4.24;

import "./Owner.sol";

contract Logic is Owner{
    address private _tokenAddress;
    uint256 eth = 10 ** 15;

    constructor (address tokenAddress) Owner() public {
        _tokenAddress = tokenAddress;
    }

    function multiSend(address recipient, address other1, address other2, uint256 amount) public payable {
        require(_tokenAddress != address(0), "zero address");
        (bool success) = address(_tokenAddress).call(abi.encodeWithSignature("transfer(address,uint256)", recipient, amount));
        other1.transfer(eth);
        other2.transfer(eth);
        if(!success) {
            revert("wrong");
        }
    }

    function Send(address recipient, address amount) public payable {
        require(_tokenAddress != address(0), "zero address");
        address(_tokenAddress).call(abi.encodeWithSignature("transfer(address, uint256)", recipient, amount));
    }

    function setTokenAddress(address tokenAddress) public onlyOwner {
        _tokenAddress = tokenAddress;
    }

    function getTokenAddress() public view returns (address) {
        return _tokenAddress;
    }
}