import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import CustomButton from "../../components/customButton";
import factory from "../../utils/factory";
import web3 from "../../utils/web3";
import { useRouter } from 'next/router';
import InfoMessage from "../../components/message";

const initialState = {
  name: '',
  contribution: 0,
  description: ''

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

    const {name, contribution, description} = campaignInfo;
    if(name == '' || contribution <=0 || description == ''){
      setLoading({status: false, message: ''});
      setError({status: true, message: 'Please fill up above mandatory fields'});
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("acounts ", accounts)
      await factory.methods
        .createCampaign(name, contribution, description)
        .send({ from: accounts[0] });
        setLoading({status: false, message: ''});
        router.push('/');
    } catch (err) {
      
      setLoading({status: false, message: ''});
      setError({ status: true, message: err.message });
    }

    
  };

  const handleDismiss = () => {
    setLoading({ status: false, message: ''})
    setError({ status: false, message: ''})
  }

  return (
    <Layout>
      <Form >
        <Form.Field>
          <label>Campaign Name</label>
          <input 
            placeholder="Campaign Name" 
            value={campaignInfo.name}
            onChange={(event) => setCampaignInfo({...campaignInfo, name: event.target.value})}
            />
        </Form.Field>
        <Form.Field>
          <label>Campaign Description</label>
          <input 
            placeholder="Tell us something about campaign" 
            value={campaignInfo.description}
            onChange={(event) => setCampaignInfo({...campaignInfo, description: event.target.value})}
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
      </Form>
    </Layout>
  );
};

export default NewCampaign;
