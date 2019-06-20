import {salespersonPhoneNumberConstants} from '../constants';
import {salespersonPhoneNumbersService} from "../services/salespersonPhoneNumbers.service"


export const salespersonPhoneNumbersActions = {
    getNumberByContactID,
    setSenderID,
};
function setSenderID(id) {
    return {type: salespersonPhoneNumberConstants.SET_SENDER_ID, id }
}

function getNumberByContactID(id) {
    return dispatch => {
        dispatch(request(id));
        salespersonPhoneNumbersService.getByContactID(id)
            .then(
                contact => {
                    dispatch(success(id, contact));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: salespersonPhoneNumberConstants.GET_BY_ID_REQUEST, id } }
    function success(id, contact) { console.log("success");return { type: salespersonPhoneNumberConstants.GET_BY_ID_SUCCESS, id, contact} }
    function failure(id, error) { return { type: salespersonPhoneNumberConstants.GET_BY_ID_FAILURE, id, error } }
}



