import React from "react";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {clientActions, contactActions, commentsActions} from "../../actions";
import {PhoneDialer} from "./Dialer"
import {CallTable} from "./CallTable"
import {CommentsDisplay} from "./../Comments/Comments"
import {SearchableComments} from "./../Comments/SearchableComments"
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import IconButton from '@material-ui/core/IconButton';
import {DisplayDate} from "./../Dates"
import {EmailList} from "./ClientEmails"
import {SalesNumberPicker} from "./SalesNumberPicker"
import {Notifications} from "../Notification/Notifications";


const styles = {
    card: {
        minWidth: 300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    textField: {

        width: 200,
    },
    recordCallIcon: {}
};

class CallTab extends React.Component {

    constructor(props) {
        super(props);
        let dispatch = this.props.dispatch;
    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {
        /*this.props.client.client.forEach(function (item, index) {
            console.log(item.client_code);
            //this.props.dispatch(clientActions.getDetailsByCode(item.client_code));
        });*/
        /*
        if (this.props.activeClient !== nextProps.activeClient) {
            let clientCode = nextProps.activeClient;
            if (this.props.clientDetails.hasOwnProperty(clientCode)) {
                let client = nextProps.clientDetails[clientCode];
                for (const code in client.contact_id) {
                    let contactCode = client.contact_id[code];

                    //this.props.dispatch(contactActions.getByContactID(contactCode));
                }
            } else {
                this.props.dispatch(clientActions.getDetailsByCode(clientCode));
            }
        }*/
    }

    render() {
        const contacts = [];
        const clientCode = this.props.activeClient;
        const client = this.props.clientDetails[clientCode];

        if (this.props.clientDetails.hasOwnProperty(clientCode)) {

            for (const code in client.contact_id) {
                const contactID = client.contact_id[code];

                contacts.push(<ContactCard key={code} clientName={this.props.activeClient} contactID={contactID}
                                           contact={this.props.contact.contacts}/>)
            }
        }
        try {
            let lastCall = new Date(client.last_call);
            let nextCall = new Date(client.next_call);
            //todo: change to visual
            return (
                <Box>
                    <Notifications SelectedClient={clientCode}/>
                    <Box><SalesNumberPicker/></Box>
                    <Box display="flex" alignItems="flex-start">
                        <DisplayDate displaydate={lastCall} clickable={false} clientCode={clientCode}
                                     title={"Last Call"} tip={""}/>
                        <DisplayDate displaydate={nextCall} clickable={true} client title={"Next Call"}
                                     tip={"Double click to Change Time"}/>
                    </Box>
                    <Box display="flex" alignItems="flex-start" flexWrap="wrap">
                        {contacts}
                    </Box>
                    <Box><SearchableComments/></Box>


                </Box>
            );
        } catch {
            return <div> Select a Client on the Left to Begin</div>;
        }
    }
}

const cardStyle = {
    minWidth: 250,
    width: 250,
    height: 350,
    margin: 20,
    padding: 2,
};


export function ContactCard(props) {
    const clientName = props.clientName;
    try {
        if (props.contact.hasOwnProperty(props.contactID)) {
            const dialier = [];
            for (const phoneID in props.contact[props.contactID].phone_number_id) {
                const id = props.contact[props.contactID].phone_number_id[phoneID];

                dialier.push(<PhoneDialer id={id}/>);
            }

            return (

                <Card style={cardStyle} raised>
                    <CardContent>

                        <Typography gutterBottom variant="h5" component="h4">
                            {props.contact[props.contactID].name}
                        </Typography>
                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                            {props.contact[props.contactID].job_title}
                        </Typography>
                        <Typography className={styles.bullet} color="textSecondary" gutterBottom>
                            {dialier}

                        </Typography>
                        <EmailList contactID={props.contactID}/>

                    </CardContent>
                </Card>
            );
        } else {
            return <div></div>
        }
    } catch (e) {
        return <div>Error and stuff </div>
    }
}

export function NewContact(props) {

    return (
        <Card style={cardStyle} raised>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Add Contact
                </Typography>
                <Typography gutterBottom variant="body2" component="body2">
                    <TextField
                        required
                        id="name"
                        label="Name"
                        className={styles.textField}
                        margin="normal"
                    />
                    <TextField
                        required
                        id="title"
                        label="Job Title"
                        className={styles.textField}
                        margin="normal"
                    />
                    <button>Save</button>

                </Typography>
            </CardContent>
        </Card>
    );
}


export function StoreCard(props) {
    if (props.clients.hasOwnProperty(props.clientCode)) {
        const client = props.clients[props.clientCode];
        return (
            <Card style={cardStyle} raised>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Store Info
                    </Typography>
                    {props.clientCode}
                    {client.client_name}
                </CardContent>
            </Card>
        );
    }
    return (
        <Card style={cardStyle} raised>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Store Info
                </Typography>
                {props.clientCode}
            </CardContent>
        </Card>
    )
}
/*
function RecordManualCall() {
    return (
        <IconButton>
            <PermPhoneMsgIcon/>
        </IconButton>
    );
}
*/
function mapStateToProps(state) {
    const {client, contact} = state;

    return {
        contact: contact,
        client,
        clientDetails: client.clientDetails,
        activeClient: client.activeClient,

    };
}

const connected_component = connect(mapStateToProps);
const connectedCallTab = connected_component(CallTab);
export {connectedCallTab as CallTab};
