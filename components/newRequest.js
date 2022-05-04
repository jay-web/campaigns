import React from "react";
import { Form, Input, Message } from "semantic-ui-react";
import Layout from "./layout";
import CustomButton from "./customButton";
import InfoMessage from "./message";

const RequestForm = (props) => {
  const requestInfo = props.info;
  const loading = props.loading;
  const error = props.error;
  const changeHandler = props.handlers;
  const onSubmit = props.onSubmit;
  const handleDismiss = props.handleDismiss;


  return (
    
      <Form error={error.status}>
        <Form.Field>
          <label>Request Description</label>
          <input 
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
            />
        </Form.Field>
        <Form.Field>
          <label>Recipient </label>
          <input
            placeholder="Recipient Address"
            value={requestInfo.recipient}
            onChange={changeHandler}
            name="recipient"
          />
        </Form.Field>
        <InfoMessage error={error} loading={loading} handleDismiss={handleDismiss}/>
      
        <CustomButton
          content="Raise Request"
          iconName="add"
          floated={false}
          onSubmit={onSubmit}
          loading={loading.status}
        />
      </Form>
    
  );
};




export default RequestForm;
