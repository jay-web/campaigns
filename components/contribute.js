import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import Layout from "./layout";
import CustomButton from "./customButton";
import campaignInstance from "../utils/campaign";
import web3 from "../utils/web3";
import { useRouter } from "next/router";
import InfoMessage from "./message";

const ContibutionForm = (props) => {
  const [contribution, setContribution] = useState(0);
  const [error, setError] = useState({ status: false, message: ''});
  const [loading, setLoading] = useState({status: false, message: ''});
  const router = useRouter();
  const campaignId = props.id;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading({status: true, message: 'Transacting approving request'});
    setError({status: false, message: ''});

    if(contribution <=0 ){
      setLoading({status: false, message: ''});
      setError({status: true, message: 'Please enter correct amount'});
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      let campaign = await campaignInstance(campaignId);

      await campaign.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(contribution, "ether"),
        });
        setLoading({status: false, message: ''});
        setContribution(0);
        router.replace(`/campaign/${encodeURIComponent(campaignId)}`)
      
        
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
    <Form error={error.errorStatus}>
      <Form.Field>
        <label style={{color: "white"}}>Contribution </label>
        <Input
          label="ether"
          labelPosition="right"
          placeholder="Amount in Ether"
          value={contribution}
          onChange={(event) => setContribution(event.target.value)}
        />
      </Form.Field>
      <InfoMessage error={error} loading={loading} handleDismiss={handleDismiss}/>
     
      <CustomButton
        content="Contribute"
        iconName="payment"
        floated={false}
        onSubmit={onSubmit}
        loading={loading.status}
      />
    </Form>
  );
};

export default ContibutionForm;
