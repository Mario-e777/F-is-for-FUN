// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract FunToken is ERC20 { 
  constructor(
    string memory name,
    string memory symbol,
    uint amount
  ) ERC20(name, symbol) {
    _mint(msg.sender, amount * 10**uint(decimals()));
  }
}