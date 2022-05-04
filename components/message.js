import React from "react";
import { Button, Checkbox, Form, Input, Icon, Message } from "semantic-ui-react";

const InfoMessage = (props) => {
    const { error, handleDismiss,loading } = props;
    return (
        <>
        <Message negative hidden={!error.status} onDismiss={handleDismiss}>
        <Message.Header>Oopss !!!</Message.Header>
        <p>{error.message}</p>
      </Message>
      <Message icon hidden={!loading.status}  onDismiss={handleDismiss}>
        <Icon name="circle notched" loading={loading.status} />
        <Message.Content>
          <Message.Header>Please wait</Message.Header>
          {loading.message}
        </Message.Content>
      </Message>
      </>
    )
}

export default InfoMessage;