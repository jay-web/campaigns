import  web3 from  "./web3"
import compiledFactory from "../abis/CrowdFunding.json"



const {abi} = compiledFactory;

const instance = new web3.eth.Contract(
    abi,
    process.env.NEXT_PUBLIC_CROWDFUNDING_ADDRESS
    )

export default instance;