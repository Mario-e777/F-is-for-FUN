// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Fundraiser.sol";

contract Factory { 
  Fundraiser[] private _fundraisers;
  uint256 constant maxLimit = 20;

  event FundraiserCreated(Fundraiser indexed fundraiser);

  function fundraisersCount() public view returns(uint256) { 
    return _fundraisers.length;
  }

  function createFundraiser( 
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    address payable beneficiary
  ) public {
    Fundraiser fundraiser = new Fundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      msg.sender
    );
    _fundraisers.push(fundraiser);
    emit FundraiserCreated(fundraiser);
  }

  function fundraisers(uint256 limit, uint256 offset) public view returns(Fundraiser[] memory coll) {
    require(offset <= fundraisersCount(), "offset out of bounds");

    uint256 size = fundraisersCount() - offset;
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;
    coll = new Fundraiser[](size);

    for(uint256 i = 0; i < size; i++) {
      coll[i] = _fundraisers[offset + i];
    }

    return coll;
  }
}