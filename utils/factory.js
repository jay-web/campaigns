import  web3 from  "./web3"
import compiledFactory from "../abis/CrowdFunding.json"
import config from "../note";


const {abi} = compiledFactory;

const instance = new web3.eth.Contract(
    abi,
    config.deployAdd
    )

export default instance;