// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CrowdFunding {
    address[] public numberOfCampaigns;
   
  

    function createCampaign(string memory name, uint minimum, string memory imageHash) public  {
        Campaign newAddress = new Campaign(name, minimum, msg.sender, imageHash);
        
        numberOfCampaigns.push(address(newAddress));
        
        
    }

    function isCampaignAvailable() public view returns(bool){
        return numberOfCampaigns.length > 0 ? true : false;
    }

    function getDeployedCampaigns() public view returns(address[] memory){
       
        return numberOfCampaigns;
    }   

   
}


