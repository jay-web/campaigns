# Crowd-funding

CrowdFunding is the defi application which is connected to the ethereum network.
With the help of this application user can create their own campaign to raise the fund for their project.
Since smart contract has been used to create the campaign on ethereum network, user can collect the fund in their ethereum account.
                
Application UI is based on react.js and next.js to interact with smart contract functionality. Any user can contribute
to the campaign as per their choice and become the contributor. Campaign creator can raise the request to spend the fund
for the continuity of project, for which contributors will vote. If request gets more the 50% vote, then creator can spend the fund from smart contract wallet.


To run this project on local development:

          1:  Clone the project into local repo
          2:  Run npm install
          3:  Run node compile.js
          4:  Run node deploy.js ( copy the deployed address from console, paste the same in note.js file )
          5:  Run npm run dev ( Check at localhost:3000 )

Note - Create note.js file in root folder and paste the below code :
  
    let config = {
      deployAdd : "copy and paste here,  from above 4th command output",
      mnemonic : "paste your meta mask mnemonic",
      networkID : "Paste your RINKYBY OR ROPSTEN network id""
     }
     module.exports = config;
