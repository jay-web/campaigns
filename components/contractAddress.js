import React from "react";
import { Label, Icon } from "semantic-ui-react";

const ContractAddress = ({id}) => {
    return (
        <Label style={{ marginBottom: "1rem" }}>
                  <Icon name="address card" /> Contract Address: {id}
        </Label>
    )
}

export default ContractAddress;