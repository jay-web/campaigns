import React from "react";
import { Form, Input, Message } from "semantic-ui-react";
import Layout from "./layout";
import CustomButton from "./customButton";
import InfoMessage from "./message";

import styles from "../styles/NewRequest.module.css";

const RequestForm = (props) => {
  const requestInfo = props.info;
  const loading = props.loading;
  const error = props.error;
  const changeHandler = props.handlers;
  const onSubmit = props.onSubmit;
  const handleDismiss = props.handleDismiss;


  return (
    
      <Form error={error.status} className={styles.form}>
        <Form.Field>
          <label>Request Description</label>
          <textarea 
            placeholder="Request Description" 
            value={requestInfo.description}
            onChange={changeHandler}
            name="description"
            />
        </Form.Field>
        <Form.Field>
          <label>Amount need to be spend (either)</label>
          <Input
           
            label="Either"
            labelPosition="right"
            placeholder="Amount in Either" 
            value={requestInfo.value}
            onChange={changeHandler}
            name="value"
            required
            />
        </Form.Field>
        <Form.Field>
          <label>Recipient </label>
          <Input
            label="Recipient Address"
            placeholder=""
            value={requestInfo.recipient}
            onChange={changeHandler}
            name="recipient"
            required
          />
        </Form.Field>
        <InfoMessage error={error} loading={loading} handleDismiss={handleDismiss}/>
      
        <CustomButton
          content="Raise Request"
          iconName="add"
          floated={false}
          onSubmit={onSubmit}
          loading={loading.status}
          required
        />
      </Form>
    
  );
};




export default RequestForm;
