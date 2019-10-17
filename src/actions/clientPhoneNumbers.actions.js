import {clientPhoneNumberConstants} from '../constants';
import {clientPhoneNumbersService} from "../services/clientPhoneNumbers.service"

export const clientPhoneNumbersActions = {
    getNumberByContactID,
    makeCall,
    addNumber,
};

function addNumber(contactID, numberType, number) {
    const data = {contact_id: contactID, number_type: numberType,number : number,call_id:[]};
    return dispatch => {
        clientPhoneNumbersService.addNumber(data)
            .then(
                id => {
                    dispatch(success(contactID));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function success(contactID,) {
        return getNumberByContactID(contactID);
    }

    function failure(id, error) {
        return {type: clientPhoneNumberConstants.GET_BY_ID_FAILURE, id, error}
    }
}

function makeCall (salesID, clientID) {
    clientPhoneNumbersService.makeCall(salesID,clientID)

}

function getNumberByContactID(id) {
    return dispatch => {
        dispatch(request(id));
        clientPhoneNumbersService.getByContactID(id)
            .then(
                contact => {
                    dispatch(success(id, contact));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: clientPhoneNumberConstants.GET_BY_ID_REQUEST, id } }
    function success(id, contact) { console.log("success");return { type: clientPhoneNumberConstants.GET_BY_ID_SUCCESS, id, contact} }
    function failure(id, error) { return { type: clientPhoneNumberConstants.GET_BY_ID_FAILURE, id, error } }
}



