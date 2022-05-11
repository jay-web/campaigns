import React from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import web3 from "../utils/web3";

const RequestsTable = (props) => {
  const { requests, contributor, onApprove, onFinalize } = props;

  return (
    <Table  inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Amount (ether)</Table.HeaderCell>
          <Table.HeaderCell>Recipient</Table.HeaderCell>
          <Table.HeaderCell>Approval Count</Table.HeaderCell>
          <Table.HeaderCell>Complete</Table.HeaderCell>
          <Table.HeaderCell>Approve</Table.HeaderCell>
          <Table.HeaderCell>Finalize</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body >{requestRows(requests, contributor, onApprove, onFinalize)}</Table.Body>
    </Table>
  );
};

const requestRows = (requests, contributor, onApprove, onFinalize) => {
  return requests.map((ele, index) => {
    return (
      <Table.Row key={index}>
        <Table.Cell>{index}</Table.Cell>
        <Table.Cell>{ele.description}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(ele.value, "ether")}</Table.Cell>
        <Table.Cell>{ele.recipient}</Table.Cell>
        <Table.Cell>
          {ele.approvalCount}/{contributor}
        </Table.Cell>
        <Table.Cell>{ele.complete ? "Yes" : "No"}</Table.Cell>
        <Table.Cell>
        <Button animated primary onClick={() => onApprove(index)}  size="tiny" disabled={ele.complete}>
            <Button.Content visible>{ ele.complete ? "Already Approved" : "Approve" } </Button.Content>
            <Button.Content hidden>
            <Icon name="thumbs up" />
            </Button.Content>
        </Button>
        
        </Table.Cell>
        <Table.Cell>
        <Button animated primary onClick={() => onFinalize(index)} disabled={ele.complete}  size="tiny">
            <Button.Content visible>{ele.complete ? "Already Finalized" : "Finalize"}</Button.Content>
            <Button.Content hidden>
            <Icon name="thumbs up" />
            </Button.Content>
        </Button>
         
        </Table.Cell>
      </Table.Row>
    );
  });
};

export default RequestsTable;
