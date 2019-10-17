import React, {useState} from 'react';
import {connect} from "react-redux";
import {clientPhoneNumbersActions, contactActions} from "../../actions";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useForm} from "./formHooks"
import TextField from '@material-ui/core/TextField';

class ClientSettingsTab extends React.Component {

    render() {
        const clientCode = this.props.client.activeClient;

        const clientDetails = this.props.client.clientDetails[clientCode];
        const contacts = [];
        try {

            for (const id in clientDetails.contact_id) {
                const contact_num = clientDetails.contact_id[id];
                //this.props.dispatch(contactActions.getByContactID(contact_num));
                //console.log(contact_num);
                contacts.push(this.props.contact.contacts[contact_num]);
            }
            /*return (
                <div>
                    <ContactInfo clientDetails={clientDetails}/>
                    <AddContactNumber/><br/>
                    <SelectContacts contacts={contacts}/>
                </div>
            );*/
            return (
                <div>Clients <ContactTabs clientCode={clientDetails.client_code} dispatch={this.props.dispatch}
                                          clientID={clientDetails.client_id}
                                          clientPhoneNumber={this.props.clientPhoneNumber}
                                          contacts={this.props.contact.contacts} contactIds={clientDetails.contact_id}/>
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
    //tabs.push();

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs variant="scrollable"
                      scrollButtons="on"
                      value={tabIndex}
                      onChange={(event, newValue) => setIndex(newValue)}>
                    {tabs}
                    <Tab label="ADD"/>
                </Tabs>
            </AppBar>
            <ContactTab clientCode={props.client_code} clientID={props.clientID} count={count} dispatch={props.dispatch}
                        clientPhoneNumber={props.clientPhoneNumber} index={tabIndex}
                        contactsInfo={props.contacts[props.contactIds[tabIndex]]}/>

        </div>);
}

function ContactInfo(props) {
    return (
        <div>
            <p>Name: {props.contactsInfo.name}</p>
            <p>Title: {props.contactsInfo.job_title}</p>
        </div>)
}

function ContactNumbers(props) {
    console.log(props.numbersIds);
    console.log(props.clientPhoneNumber);
    const numbers = [];
    for (const id in props.numbersIds) {
        const clientNumberId = props.numbersIds[id];
        const numberInfo = props.clientPhoneNumber[clientNumberId];
        numbers.push(
            <tr>
                <td>{numberInfo.number_type}</td>
                <td>{numberInfo.number}</td>
            </tr>
        );

    }
    return (<table>
        <tbody>{numbers}</tbody>
    </table>)
}


const AddNumber = (props) => {
    const onAddNumber = () => {
        //this.props.dispatch();
        props.dispatch(clientPhoneNumbersActions.addNumber(props.contactID, inputs.numberType, inputs.number));


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

            <button type="submit">Add</button>
        </form>
    );
};

function AddContact(props) {
    const onAddContact = () => {
        console.log(inputs.jobTitle);
        console.log(inputs.contactName);
        console.log(props.clientID);
        props.dispatch(contactActions.addContact(props.clientID, inputs.jobTitle, inputs.contactName, props.client_code));
    };
    const {inputs, handleInputChange, handleSubmit} = useForm(onAddContact);
    return (
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

            <button type="submit">Add</button>
        </form>
    );
}


function ContactTab(props) {
    try {

        if (props.count === props.index) {
            return <AddContact clientCode={props.client_code} clientID={props.clientID} dispatch={props.dispatch}/>
        }
        return (
            <div>
                <h3>Contact Info</h3>

                <ContactInfo contactsInfo={props.contactsInfo}/>

                <ContactNumbers clientPhoneNumber={props.clientPhoneNumber}
                                numbersIds={props.contactsInfo.phone_number_id}/>

                <AddNumber dispatch={props.dispatch} contactID={props.contactsInfo.contact_id}/>
            </div>
        )
    } catch (e) {
        return <div>{e}</div>;
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
    const {client, contact, clientPhoneNumber} = state;

    return {
        client,
        contact,
        clientPhoneNumber,
    };
}

const connected_component = connect(mapStateToProps);
const connectedClientSettingsTab = connected_component(ClientSettingsTab);
export {connectedClientSettingsTab as ClientSettingsTab};
