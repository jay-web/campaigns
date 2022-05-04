import React from 'react';
import Layout from "../components/layout";
import { Menu } from 'semantic-ui-react'

const AboutUs = () => {
    return (
        <Layout>
            <div style={{fontSize: '1.4rem', fontFamily: 'Bitter, serif'}}>
            <h1>CrowdFunding</h1>
            <p> CrowdFunding is the defi application which is connected to the ethereum network. 
                With the help of this application user can create their own campaign to raise the fund for their project.
                Since smart contract has been used to create the campaign on ethereum network and collect the fund in their account.
                </p>
            <p> Application UI is based on react.js and next.js to interact with smart contract functionality. Any user can contribute 
                to the campaign as per their choice and become the contributor. Campaign creator can raise the request to spend the fund
                for the continuity of project, for which contributors will vote. If request gets more the 50% vote, then creator can spend the fund from smart contract wallet.

            </p>
            </div>
           
        </Layout>
    )
}

export default AboutUs;