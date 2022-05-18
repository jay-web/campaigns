import React from 'react';
import Layout from "../components/layout";
import styles from "../styles/About.module.css";

const AboutUs = () => {
    return (
        <Layout background={styles.main}>
            <div >
            <h1 className={styles.heading}>Campaigns</h1>
            <p> Campaigns is the defi application which is connected to the ethereum network. 
                With the help of this application user can create their own campaign to raise the fund for their project.
                Since smart contract has been used to create the campaign on ethereum network and collect the fund in their account.
                </p>
            <p> Application UI is based on react.js and next.js to interact with smart contract functionality. Any user can contribute 
                to the campaign as per their choice and become the contributor. Campaign creator can raise the request to spend the fund
                for the continuity of project, for which contributors will vote. If request gets more the 50% vote, then creator can spend the fund from smart contract wallet.

            </p>
            <p> Application is deployed on Ropsten public testing network. You may use dummy ethers to create your campaign or denote to your favourite dummy campaign to test.</p>
            </div>
           
        </Layout>
    )
}

export default AboutUs;