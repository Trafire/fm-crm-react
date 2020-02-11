import {connect} from "react-redux";
import React from "react";
import {emailActions} from "../../actions";
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

const listStyle = {
    listStyleType: "none",
    textAlign: 'left'

};

class EmailList extends React.Component {

    constructor(props) {
        super(props);
        const contactID = this.props.contactID;
        const contact_list = this.props.contact.contacts[contactID].email_id;
        for (const addressIndex in contact_list) {
            const address = contact_list[addressIndex];
            props.dispatch(emailActions.getByEmailID(address));

        }
    }

    render() {

        const contactID = this.props.contactID;
        const address_list = [];
        const contact_list = this.props.contact.contacts[contactID].email_id;
        for (const addressIndex in contact_list) {
            const address = contact_list[addressIndex];
            if (address in this.props.email && !this.props.email[address].loading) {
                address_list.push(
                    <div>
                        <a href={"mailto:" + this.props.email[address].email}>
                            <IconButton
                                aria-label="email"
                                title={this.props.email[address].email}
                            >
                                <EmailIcon/>
                            </IconButton>

                        </a>{this.props.email[address].description}
                    </div>
                )
            }
        }
        if (address_list.length > 0) {
            return <div>
                {address_list}
            </div>;
        }

        return <div/>;

    }
}


function mapStateToProps(state) {
    const {contact, email} = state;
    return {
        contact,
        email,
    };
}

const connected_component = connect(mapStateToProps);
const connectedEmailList = connected_component(EmailList);
export {connectedEmailList as EmailList};
