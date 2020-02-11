import React from "react";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import CommentDialog from "../CallTab/CallDialog";


function getLastPhoneCall(client, contact) {
    const activeClient = client.activeClient;
    const contactNumbers = client.clientDetails[activeClient].contact_id;
    const phoneNumbers = [];

}

function countPhoneCalls() {

}

function AddCommentButton(props) {
    try {
        if (props.calls.length === 0) {
            return <div/>;
        }
    } catch (e) {
        return <div/>;
    }


    const call = props.calls[0];
    try {
        return (<CommentDialog call_id={call.call_id}
                               clientId={props.client.clientDetails[props.client.activeClient]['client_id']}
                               clientCode={props.client.activeClient}
                               salesperson_id={props.salesperson.salesperson.salesperson}
                               dispatch={props.dispatch}
                               value={props.clientPhoneNumber[call.phone_number_id].phone_number_id}/>);
    } catch {
        return <div/>;
    }

}


function mapStateToProps(state) {
    const {contact, client, salesperson, clientPhoneNumber} = state;

    return {
        calls: contact.calls,
        client,
        salesperson,
        clientPhoneNumber
    };
}


const connected_component = connect(mapStateToProps);
const connectedAddCommentButton = connected_component(AddCommentButton);
export {connectedAddCommentButton as AddCommentButton};
