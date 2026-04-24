// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice Simple fixed-supply ERC-20 minted entirely to the deployer.
contract DesertBarrelToken is ERC20 {
  constructor(string memory name_, string memory symbol_, uint256 totalSupply_) ERC20(name_, symbol_) {
    _mint(msg.sender, totalSupply_);
  }
}
