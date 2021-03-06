import Web3 from "web3";


let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  console.log("mode ", process.env.NODE_ENV)
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  if(process.env.NODE_ENV == "development"){
    const provider = new Web3.providers.HttpProvider(
      process.env.NEXT_PUBLIC_DEV_NETWORK_ID_TESTING
    );
    web3 = new Web3(provider);
  }else{
    const provider = new Web3.providers.HttpProvider(
      process.env.NEXT_PUBLIC_NETWORK_ID_TESTING
    );
    web3 = new Web3(provider);
  }
  
 
}
 
export default web3;