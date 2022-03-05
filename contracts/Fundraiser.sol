// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract Fundraiser is Ownable {
  using SafeMath for uint256;

  struct Donation {
    uint256 value;
    uint256 date;
  }

  string public name;
  string public siteURL;
  string public imageURL;
  string public description;
  address payable public beneficiary;
  uint256 public totalDonations;
  uint256 public donationsCount;
  uint public donationGoal;
  uint public startAt;
  uint public endAt;

  event DonationReceived(address indexed donor, uint256 value);
  event Withdraw(uint256 amount);

  mapping(address => Donation[]) private _donations;

  constructor(
    string memory _name,
    string memory _siteURL,
    string memory _imageURL,
    string memory _description,
    address payable _beneficiary,
    uint _donationGoal,
    uint _endAt,
    uint _startAt
  ) public { 
    name = _name;
    siteURL = _siteURL;
    imageURL = _imageURL;
    description = _description;
    beneficiary = _beneficiary;
    donationGoal = _donationGoal;
    startAt = _startAt;
    endAt = _endAt;
    _transferOwnership(_beneficiary);
  }

  /* Retrive total donations count from sender */
  function myDonationsCount() public view returns(uint256) { 
    return _donations[msg.sender].length;
  }

  function donate() public payable { 
    Donation memory donation = Donation({
        value: msg.value,
        date: block.timestamp
    });
    _donations[msg.sender].push(donation);
    totalDonations = totalDonations.add(msg.value);
    donationsCount++;

    emit DonationReceived(msg.sender, msg.value);
  }

  /* Retrive sender's donations */
  function myDonations() public view returns(uint256[] memory values, uint256[] memory dates) {
    uint256 count = myDonationsCount(); 
    values = new uint256[](count); 
    dates = new uint256[](count);

    for (uint256 i = 0; i < count; i++) {
      Donation storage donation = _donations[msg.sender][i];
      values[i] = donation.value;
      dates[i] = donation.date;
    }
    
    return (values, dates);
  }

  function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    beneficiary.transfer(balance);
    emit Withdraw(balance);
  }

  fallback() external payable {
    totalDonations = totalDonations.add(msg.value); 
    donationsCount++;
  }
}