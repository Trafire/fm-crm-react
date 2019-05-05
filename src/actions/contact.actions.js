import {contactConstants} from '../constants';
import {contactService} from "../services/contact.service";

export const contactActions = {
    getByContactID,
};

function getByContactID(id) {
    return dispatch => {
        dispatch(request(id));
        contactService.getByContactID(id)
            .then(
                contact => {
                    dispatch(success(id, contact));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: contactConstants.GET_BY_ID_REQUEST, id } }
    function success(id, contact) { return { type: contactConstants.GET_BY_ID_SUCCESS, id, contact} }
    function failure(id, error) { return { type: contactConstants.GET_BY_ID_FAILURE, id, error } }
}



