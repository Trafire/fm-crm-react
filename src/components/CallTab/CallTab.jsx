import React from "react";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import {unstable_Box as Box} from "@material-ui/core/es/Box";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {contactActions} from "../../actions";

class CallTab extends React.Component {

    componentDidMount() {
        let clientCode = this.props.activeClient;
        let contactIDs = this.props.clientDetails;
        if (this.props.clientDetails.hasOwnProperty(clientCode)) {
            let client = this.props.clientDetails[clientCode];
            for (const code in client.contact_id) {
                console.log(client.contact_id[code]);
                let contactCode = client.contact_id[code];

                this.props.dispatch(contactActions.getByContactID(contactCode));
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeClient != nextProps.activeClient) {
            let clientCode = this.props.activeClient;
            if (this.props.clientDetails.hasOwnProperty(clientCode)) {
                let client = this.props.clientDetails[clientCode];
                for (const code in client.contact_id) {
                    console.log(client.contact_id[code]);
                    let contactCode = client.contact_id[code];

                    this.props.dispatch(contactActions.getByContactID(contactCode));
                }
            }
        }
    }

    render() {
        const contacts = [];
        const clientCode = this.props.activeClient;
        const client = this.props.clientDetails[clientCode];
        if (this.props.clientDetails.hasOwnProperty(clientCode)) {
            for (const code in client.contact_id) {
                const contactID = client.contact_id[code];

                contacts.push(<ContactCard key={code} clientName={this.props.activeClient} contactID={contactID}
                                           contact={this.props.contact}/>)
            }
        }
        return (<div>{contacts}</div>);
    }
}

const cardStyle = {width: 275, height: 400, margin: 20};

export function ContactCard(props) {
    const clientName = props.clientName;
    console.log(props.contact);
    const details = [];
    console.log(props.contact);


    if (props.contact.hasOwnProperty(props.contactID)) {
        const dialier = [];
        for (const phoneID in  props.contact[props.contactID].phone_number_id) {
            dialier.push(<PhoneDialer id={phoneID}/>);
        }
        return (

            <Card style={cardStyle} raised>
                {clientName}
                {props.contact[props.contactID].name}
                {props.contact[props.contactID].job_title}
                <p>Numbers to call:</p>
                {dialier}
            </Card>
        );
    } else {
        return <div></div>
    }
}
function PhoneDialer(props) {
    return (<div>
        {props.id}</div>);
}

function mapStateToProps(state) {
    const {client, contact} = state;

    return {
        contact,
        clientDetails: client.clientDetails,
        activeClient: client.activeClient,
    };
}

const connected_component = connect(mapStateToProps);
const connectedCallTab = connected_component(CallTab);
export {connectedCallTab as CallTab};
