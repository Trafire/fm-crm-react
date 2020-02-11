import {clientEmailConstants} from '../constants';
import {emailService} from '../services/email.service'
import {contactActions} from "./contact.actions";


export const emailActions = {
    getByEmailID,
    addEmail,
};
function addEmail(contactID, emailDescription , emailAddress ) {
    const data = {contact_id: contactID, email_description: emailDescription, email : emailAddress};
    return dispatch => {
        emailService.addEmailAddress(data,contactID)
            .then(
                email_id => {
                    dispatch(success(contactID,email_id));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function success(contactID,email_id) {
        console.log(email_id);
        //return contactActions.getByContactID(contactID);
        return getByEmailID(email_id.email_id);

    }

    function failure(error) {
        return {type: clientEmailConstants.ADD_EMAIL_ADDRESS_FAILURE, error}
    }
}


function getByEmailID(id) {
    return dispatch => {
        dispatch(request(id));
        emailService.getByEmailID(id)
            .then(
                comments => {
                    dispatch(success(id, comments));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) {
        return {type: clientEmailConstants.GET_BY_ID_REQUEST, id}
    }

    function success(id, emailAddress) {
        return {type: clientEmailConstants.GET_BY_ID_SUCCESS, id, emailAddress};
    }

    function failure(id, error) {
        return {type: clientEmailConstants.GET_BY_ID_FAILURE, id, error};
    }
}
