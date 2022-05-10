import  web3 from  "./web3"
import compiledFactory from "../abis/CrowdFunding.json"



const {abi} = compiledFactory;
let instance;

if(process.env.NODE_ENV == "development"){
     instance = new web3.eth.Contract(
        abi,
        process.env.NEXT_PUBLIC_DEV_CROWDFUNDING_ADDRESS
        )
    
}else{
    instance = new web3.eth.Contract(
        abi,
        process.env.NEXT_PUBLIC_CROWDFUNDING_ADDRESS
        )
}



export default instance;