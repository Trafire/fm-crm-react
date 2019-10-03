import React from "react";
import {connect} from "react-redux";
import {contactActions} from "../../actions";

class ClientSettingsTab extends React.Component {

    render() {
        const clientCode = this.props.client.activeClient;

        const clientDetails = this.props.client.clientDetails[clientCode];
        const contacts = [];
        try {

            for (const id in clientDetails.contact_id) {
                const contact_num = clientDetails.contact_id[id];
                this.props.dispatch(contactActions.getByContactID(contact_num));
                console.log(contact_num);
                contacts.push(this.props.contact.contacts[contact_num]);
            }
            return (
                <div>
                    <ContactInfo clientDetails={clientDetails}/>
                    <AddContactNumber/><br/>
                    <SelectContacts contacts={contacts}/>
                </div>
            );
        } catch {
            return <div/>
        }
    }
}

function ContactInfo(props) {
    const clientDetails = props.clientDetails;
    return (

        <section>
            <header>Address</header>
            <PrintAddress address={clientDetails.address} city={clientDetails.city} postal={clientDetails.postal}/>
        </section>)
}

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
                <label>Description:</label><input  name="description"/><br/>
                <label>Number:</label><input  name="number"/><br/>
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
    const {client, contact} = state;

    return {
        client,
        contact,
    };
}

const connected_component = connect(mapStateToProps);
const connectedClientSettingsTab = connected_component(ClientSettingsTab);
export {connectedClientSettingsTab as ClientSettingsTab};
