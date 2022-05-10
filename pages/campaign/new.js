import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import CustomButton from "../../components/customButton";
import factory from "../../utils/factory";
import web3 from "../../utils/web3";
import { useRouter } from 'next/router';
import InfoMessage from "../../components/message";

import styles from "../../styles/Form.module.css";

const initialState = {
  name: '',
  contribution: 0,
  description: '',
  creator: ''

}

const NewCampaign = (props) => {

  const [campaignInfo, setCampaignInfo] = useState(initialState);
  const [error, setError] = useState({ status: false, message: ''});
  const [loading, setLoading] = useState({status: false, message: ''});
 
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading({status: true, message: 'Transacting approving request'});
    setError({status: false, message: ''});

    const {name, contribution, description, creator} = campaignInfo;
    if(name == '' || contribution <=0 || description == '' || creator == ''){
      setLoading({status: false, message: ''});
      setError({status: true, message: 'Please fill up above mandatory fields'});
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
     
      let accountAddress = accounts[0];
      await factory.methods
        .createCampaign(name, contribution, description)
        .send({ from: accountAddress });
        setLoading({status: false, message: ''});
        router.push('/campaigns');
    } catch (err) {
      console.log("error is ", err);
      setLoading({status: false, message: ''});
      setError({ status: true, message: err.message });
    }

    
  };

  const handleDismiss = () => {
    setLoading({ status: false, message: ''})
    setError({ status: false, message: ''})
  }

  return (
    <Layout background={styles.main}>
      <Form className={styles.form}>
        <Form.Field>
          <label>Campaign Name</label>
          <Input 
            label="Campaign Name"
            placeholder="" 
            value={campaignInfo.name}
            onChange={(event) => setCampaignInfo({...campaignInfo, name: event.target.value})}
            required
            />
        </Form.Field>
        <Form.Field>
          <label>Campaign Creator Name</label>
          <Input 
            label="Creator Name"
            placeholder="" 
            value={campaignInfo.creator}
            onChange={(event) => setCampaignInfo({...campaignInfo, creator: event.target.value})}
            required
            />
        </Form.Field>
        <Form.Field>
          <label>Campaign Description</label>
          <textarea 
            placeholder="Write something about campaign" 
            value={campaignInfo.description}
            onChange={(event) => setCampaignInfo({...campaignInfo, description: event.target.value})}
            required
            />
        </Form.Field>
        <Form.Field>
          <label>Minimum Contribution in (Wei) </label>
          <Input
            label="wei"
            labelPosition="right"
            placeholder="Amount in Wei"
            value={campaignInfo.contribution}
            onChange={(event) => setCampaignInfo({...campaignInfo, contribution: event.target.value})}
            required
          />
        </Form.Field>
        <InfoMessage error={error} loading={loading} handleDismiss={handleDismiss} />
        
        
        <CustomButton
          content="Submit"
          iconName="add"
          floated={false}
          onSubmit={onSubmit}
          loading={loading.status}
        />
        <p style={{ color: "white", fontSize: "1.1rem"}}>(Note: This is dummy application. Do not use real assets )</p>
      </Form>
    </Layout>
  );
};

export default NewCampaign;
