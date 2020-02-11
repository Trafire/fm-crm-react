import React, {useState} from 'react';
import {connect} from "react-redux";
import {clientPhoneNumbersActions, contactActions, emailActions, clientActions} from "../../actions";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useForm} from "./formHooks"
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const contactCell = {
    margin: "3px",
};
const contactForm = {
    margin: 5,
    padding: 5,
    display: "inline-block",


};
const ContactsStyle = {
    display: "inline-block",
    margin: 10,
};

class ClientSettingsTab extends React.Component {

    render() {
        const clientCode = this.props.client.activeClient;
        const clientDetails = this.props.client.clientDetails[clientCode];
        const contacts = [];
        try {
            for (const id in clientDetails.contact_id) {
                const contact_num = clientDetails.contact_id[id];
                contacts.push(this.props.contact.contacts[contact_num]);
            }
            return (
                <div>
                    <ContactTabs email={this.props.email} clientCode={clientDetails.client_code}
                                 dispatch={this.props.dispatch}
                                 clientID={clientDetails.client_id}
                                 clientPhoneNumber={this.props.clientPhoneNumber}
                                 contacts={this.props.contact.contacts}
                                 contactIds={clientDetails.contact_id}
                                 interval={clientDetails.call_interval}
                    />
                </div>);
        } catch {
            return <div/>
        }
    }
}


function ContactTabs(props) {
    const [tabIndex, setIndex] = useState(0);
    const tabs = [];
    let count = 0;
    for (const id in props.contactIds) {
        const c = props.contactIds[id];

        try {
            tabs.push(<Tab label={props.contacts[c].name}/>);
            count += 1;
        } catch {

        }

    }

    return (
        <div>
            <div style={ContactsStyle}>
                <AppBar position="static" color="default">
                    <Tabs variant="scrollable"
                          scrollButtons="on"
                          value={tabIndex}
                          onChange={(event, newValue) => setIndex(newValue)}>
                        {tabs}
                        <Tab label="Add New Contact"/>
                    </Tabs>
                </AppBar>

                <ContactTab email={props.email} clientCode={props.clientCode} clientID={props.clientID} count={count}
                            dispatch={props.dispatch}
                            clientPhoneNumber={props.clientPhoneNumber} index={tabIndex}
                            contactsInfo={props.contacts[props.contactIds[tabIndex]]}/>
            </div>
            <hr/>
            <div style={contactCell}>
                <h3>Call Interval</h3>
                <p> Here you can set how many days a part your calls will reset to after each call.</p>
                Current Interval: {props.interval} Days
                <ChangeCallDuration clientCode={props.clientCode} dispatch={props.dispatch}/>
            </div>
        </div>);
}

function ContactInfo(props) {
    return (
        <div>
            <p>In this Section you can add New Telephone or Emails Addresses for {props.contactsInfo.name}.</p>
            <p>Simply fill in Either the email or phone Information and click the add button</p>
        </div>)
}

function ContactNumbers(props) {
    const numbers = [];
    try {
        for (const id in props.numbersIds) {

            const clientNumberId = props.numbersIds[id];

            const numberInfo = props.clientPhoneNumber[clientNumberId];
            clientPhoneNumbersActions.getNumberByContactID(numberInfo);
            numbers.push(
                <tr>
                    <td>{numberInfo.number_type}</td>
                    <td>{numberInfo.number}</td>
                </tr>
            );

        }
        return (<table>
            <tr>
                <thead><h3>Phone Numbers</h3></thead>
            </tr>
            <tbody>{numbers}</tbody>
        </table>)
    } catch (e) {
        return <h3>Phone Numbers</h3>;
    }
}

function ContactEmails(props) {
    const numbers = [];

    try {
        for (const id in props.emailIds) {
            const clientNumberId = props.emailIds[id];
            const numberInfo = props.email[clientNumberId];
            numbers.push(
                <tr>
                    <td style={contactCell}>{numberInfo.description}</td>
                    <td>{numberInfo.email}</td>
                </tr>
            );

        }
        return (<table>
            <thead><h3>Emails</h3></thead>
            <tbody>{numbers}</tbody>
        </table>)
    } catch (e) {
        return <h3>Emails</h3>;
    }
}

const ChangeCallDuration = (props) => {
    const onChangeDuration = () => {
        props.dispatch(clientActions.setCallInterval(props.clientCode, inputs.duration));
    };
    const {inputs, handleInputChange, handleSubmit} = useForm(onChangeDuration);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="integer"
                    label="Call Interval"
                    name="duration"
                    onChange={handleInputChange}
                    value={inputs.duration || ""}
                    required
                />
            </div>

            <button type="submit">Change Call Interval</button>
        </form>
    );
};

const AddNumber = (props) => {
    const onAddNumber = () => {

        props.dispatch(clientPhoneNumbersActions.addNumber(props.contactID, inputs.numberType, inputs.number));
        props.dispatch(clientActions.getDetailsByCode(props.clientCode));
    };
    const {inputs, handleInputChange, handleSubmit} = useForm(onAddNumber);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="text"
                    label="Type"
                    name="numberType"
                    onChange={handleInputChange}
                    value={inputs.numberType || ""}
                    required
                /> <br/>
                <TextField
                    type="text"
                    label="Number"
                    name="number"
                    onChange={handleInputChange}
                    value={inputs.number || ""}
                    required
                />
            </div>

            <button type="submit">Add Number</button>
        </form>
    );
};

const AddEmail = (props) => {
    const onAddEmail = () => {

        props.dispatch(emailActions.addEmail(props.contactID, inputs.emailDescription, inputs.emailAddress, props.clientID));
        props.dispatch(clientActions.getDetailsByCode(props.clientCode));
    };
    const {inputs, handleInputChange, handleSubmit} = useForm(onAddEmail);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="text"
                    label="Email Description"
                    name="emailDescription"
                    onChange={handleInputChange}
                    value={inputs.emailDescription || ""}
                    required
                /> <br/>
                <TextField
                    type="email"
                    label="Email Address"
                    name="emailAddress"
                    onChange={handleInputChange}
                    value={inputs.emailAddress || ""}
                    required
                />
            </div>

            <button type="submit">Add Email</button>
        </form>
    );
};


function AddContact(props) {
    const onAddContact = () => {
        props.dispatch(contactActions.addContact(props.clientID, inputs.jobTitle, inputs.contactName, props.clientCode));
        props.dispatch(clientActions.getDetailsByCode(props.clientCode));
    };
    const {inputs, handleInputChange, handleSubmit} = useForm(onAddContact);
    return (
        <div>
            <header>

                <p>Below you can create a new contact that you work with at {props.clientCode}.</p>
                <p>For Instance:</p>
                <p>Contact Name: John Smith</p>
                <p>Job title: Owner</p>
            </header>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="text"
                    label="Contact Name"
                    name="contactName"
                    onChange={handleInputChange}
                    value={inputs.contactName || ""}
                    required
                /> <br/>
                <TextField
                    type="text"
                    label="Job Title"
                    name="jobTitle"
                    onChange={handleInputChange}
                    value={inputs.jobTitle || ""}
                    required
                /> <br/>


            </div>

            <button type="submit">Add Contact</button>
        </form>
        </div>
    );
}


function ContactTab(props) {
    try {

        if (props.count === props.index) {
            return <AddContact clientCode={props.clientCode} clientID={props.clientID} dispatch={props.dispatch}/>
        }
        return (
            <div>
                <h3>Contact Info</h3>
                <ContactInfo contactsInfo={props.contactsInfo}/>
                <div style={contactForm}>
                    <ContactNumbers clientPhoneNumber={props.clientPhoneNumber}
                                    numbersIds={props.contactsInfo.phone_number_id}/>
                    <AddNumber clientCode={props.clientCode} dispatch={props.dispatch}
                               contactID={props.contactsInfo.contact_id}/>
                </div>
                <div style={contactForm}>
                    <ContactEmails email={props.email}
                                   emailIds={props.contactsInfo.email_id}/>
                    <AddEmail clientCode={props.clientCode} dispatch={props.dispatch}
                              contactID={props.contactsInfo.contact_id}
                              clientID={props.contactsInfo.client_id}/>
                </div>


            </div>
        )
    } catch (e) {
        return <div/>;
    }


    /*
    const phoneIds = [];
    for (const clientNumbers in props.clientPhoneNumber) {
        const n = props.clientPhoneNumber[clientNumbers].number;
        phoneIds.push(<p>Phone Id {n.number}</p>)
    }
    /*
    try {
        for (const phoneId in props.contactsInfo.phone_number_id) {

                const phoneNumber = props.clientPhoneNumber[props.contactsInfo.phone_number_id[phoneId]];
                phoneIds.push(<p>Phone Id {phoneNumber.number}</p>)

        }
    } catch{}
        return <div>
            <p> index: {props.index}</p>
            <p>contacts: {props.contactsInfo.name}</p>
            <p>title: {props.contactsInfo.job_title}</p>
            {phoneIds}
        </div>*/


}

/*
function ContactInfo(props) {
    const clientDetails = props.clientDetails;
    return (

        <section>
            <header>Address</header>
            <PrintAddress address={clientDetails.address} city={clientDetails.city} postal={clientDetails.postal}/>
        </section>)
}
*/
function PrintAddress(props) {
    return (<section>
        {props.address}<br/>
        {props.city}<br/>
        {props.postal}
    </section>)
}

class AddContactNumber extends React.Component {
    render() {
        return (
            <div>
                <label>Description:</label><input name="description"/><br/>
                <label>Number:</label><input name="number"/><br/>
                <button>Add</button>
            </div>
        );
    }
}


function SelectContacts(props) {
    try {
        const elements = props.contacts;
        const items = [];
        for (const value of elements) {
            items.push(<option value={value.contact_id} key={value.contact_id}>{value.name}</option>);
        }
        return (<select>
            {items}
        </select>);
    } catch {
        return (<select/>);
    }
}


function mapStateToProps(state) {
    const {client, contact, clientPhoneNumber, email} = state;

    return {
        client,
        contact,
        clientPhoneNumber,
        email,
    };
}

const connected_component = connect(mapStateToProps);
const connectedClientSettingsTab = connected_component(ClientSettingsTab);
export {connectedClientSettingsTab as ClientSettingsTab};
