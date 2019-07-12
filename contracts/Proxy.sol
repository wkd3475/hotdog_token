pragma solidity ^0.4.24;

import "./SafeMath.sol";

contract Storage {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000000000 * (10 ** uint256(DECIMALS));
}

contract Proxy is Storage {
    address public targetAddress;

    event FallbackCalledEvent(bytes data);

    function setTargetAddress(address _address) public {
        require(_address != address(0), "error : zero address");
        targetAddress = _address;
    }

    function getTargetAddress() public view returns (address) {
        return targetAddress;
    }

    function () external payable {
        emit FallbackCalledEvent(msg.data);
        address contractAddr = targetAddress;
        require(contractAddr != address(0), "error : zero address");
        
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)
            let result := delegatecall(gas, contractAddr, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}