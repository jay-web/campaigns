import React from "react";
import { Button, Icon } from 'semantic-ui-react'


const CustomButton = (props) => {
    const {content, iconName, floated, onSubmit, loading} = props;
    let float = floated ? "right" : "left";
    let loader = loading ? true : false;
    return (
        <Button animated  floated={float} onClick={onSubmit} loading={loader} >
            <Button.Content visible>{content}</Button.Content>
            <Button.Content hidden>
            <Icon name={iconName} />
            </Button.Content>
        </Button>
    )

}

export default CustomButton;