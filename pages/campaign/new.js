import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import CustomButton from "../../components/customButton";
import factory from "../../utils/factory";
import web3 from "../../utils/web3";
import { useRouter } from 'next/router';
import InfoMessage from "../../components/message";

import styles from "../../styles/Form.module.css";
import axios from "axios";

import crypto from "crypto";

import handleUpload from "../../middleware/fileUploaderToS3";

const initialState = {
  name: '',
  contribution: 0,
  description: '',
  creator: '',
  image: null

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

    const {name, contribution, description, creator, image} = campaignInfo;

    if(name == '' || contribution <=0 || description == '' || creator == ''){
      setLoading({status: false, message: ''});
      setError({status: true, message: 'Please fill up above mandatory fields'});
      return;
    }

  

    try {
      const accounts = await web3.eth.getAccounts();
     
      let accountAddress = accounts[0];

      let hash = crypto.getHashes();
      let imageHash = image.name + Date.now();
      imageHash = crypto.createHash('sha1').update(imageHash).digest('hex');

    
    
     const newCampaign =  await factory.methods
        .createCampaign(name, contribution, imageHash)
        .send({ from: accountAddress });
        setLoading({status: false, message: ''});

        // Now save the campaign other meta data into mongo db

        let formData = new FormData();
        formData.append("image", image, image.name);
        formData.append("name", creator);
        formData.append("campaign", name);
        formData.append("description", description);
        formData.append("imageHash", imageHash);

     
        const response = await axios({
          method: 'POST',
          url: "/api/createCampaign",
          headers: {
            'Content-Type':  'application/json',
          },
          data: formData,
        });
       
      
      
       
      
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
      <Form className={styles.form} encType="multipart/form-data">
        <Form.Field>
          <label>Campaign Name</label>
          <Input 
            label="Campaign Name"
            placeholder="" 
            name="campaignName"
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
            name="creatorName"
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
            name="description"
            onChange={(event) => setCampaignInfo({...campaignInfo, description: event.target.value})}
            required
            />
        </Form.Field>
        <Form.Field>
          <label>Campaign Image</label>
          <Input 
            type="file"
            accept="image/*"
            name="image"
            // value={campaignInfo.image}
            onChange={(event) => setCampaignInfo({...campaignInfo, image: event.target.files[0]})}
            
            />
        </Form.Field>
        <Form.Field>
          <label>Minimum Contribution in (Wei) </label>
          <Input
            label="wei"
            labelPosition="right"
            placeholder="Amount in Wei"
            name="amount"
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
