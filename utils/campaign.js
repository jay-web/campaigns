// campaign instance file

import web3 from './web3';
import compiledCampaign from "../abis/Campaign.json";

const {abi} = compiledCampaign;


const instance = async (address) => {
    
   return await new web3.eth.Contract(
        abi,
        address);
}

export default instance;