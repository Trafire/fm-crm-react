import {clientConstants} from '../constants';
import {clientService} from "../services/client.service";


export const clientActions = {
    setContactID,
    getByUserID,
    getDetailsByCode,
    setActiveByCode,
    setNextCallTime,
    setCallRatio,
    getCallTimes,
    setCallInterval,
    //addContact,
    //addContactNumber,
    //addContactEmail,

};




function getCallTimes(clientCode) {
    return dispatch => {
        dispatch(requestGetDetailsByCode(clientCode));
        clientService.getDetailsByCode(clientCode)
            .then(
                clientDetails => {
                    dispatch(successGetDetailsByCode(clientDetails, clientCode));

                },
                error => dispatch(failureGetDetailsByCode(error.toString()))
            );
    };
}

function setCallRatio(index) {
    return { type: clientConstants.SET_CALL_RATIO, index }
}

function setContactID(clientCode, contactID) {
    return { type: clientConstants.SET_CONTACT_ID, clientCode, contactID }
}

function setNextCallTime(client_code, callTime ) {
    return dispatch => {

        dispatch(request(client_code,callTime));
        clientService.setNextCallTime(client_code, {
            'client_code':client_code,
            'next_call':callTime,
        })
            .then(
                contactId => {
                    dispatch(success(client_code,callTime));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(client_code,callTime) { return { type: clientConstants.SET_NEXT_CALL_TIME_REQUEST, client_code, callTime } }
    function success(client_code, callTime) { return { type: clientConstants.SET_NEXT_CALL_TIME_SUCCESS, client_code,callTime } }
    function failure(error) { return { type: clientConstants.SET_NEXT_CALL_TIME_FAILURE, client_code, error } }
}


function setCallInterval(client_code, interval ) {
    console.log(client_code);
    console.log(interval);
    return dispatch => {

        dispatch(request(client_code,interval));
        clientService.setCallInterval(client_code, {
            'client_code':client_code,
            'call_interval':interval,
        })
            .then(
                contactId => {
                    dispatch(success(client_code,interval));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(client_code,call_interval) { return { type: clientConstants.SET_CALL_INTERVAL_REQUEST, client_code, call_interval } }
    function success(client_code, call_interval) { return { type: clientConstants.SET_CALL_INTERVAL_SUCCESS, client_code,call_interval } }
    function failure(error) { return { type: clientConstants.SET_CALL_INTERVAL_FAILURE, client_code, error } }
}
/*
function addContact(client_id, job_title,name ) {
    return dispatch => {

        dispatch(request(client_id,job_title,name));
        clientService.addContact({client_id, job_title, name})
            .then(
                contactId => {
                    dispatch(success(client_id,contactId));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(client_id,job_title,name) { return { type: clientConstants.CREATE_NEW_CONTACT_REQUEST, client_id,job_title,name } }
    function success(client_id,contactId) { return { type: clientConstants.CREATE_NEW_CONTACT_SUCCESS, client_id,contactId } }
    function failure(error) { return { type: clientConstants.CREATE_NEW_CONTACT_FAILURE, client_id, error } }
}


function addContactNumber(contact_id, number) {

}
function addContactEmail(contact_id, address) {

}
*/
function setActiveByCode(clientCode) {
    return {type: clientConstants.SET_ACTIVE_CLIENT, clientCode}
}

function getByUserID(id) {
    return dispatch => {
        dispatch(requestGetByUserID(id));
        clientService.getByUserID(id)
            .then(
                client => {
                    dispatch(successGetByUserID(client));
                },
                error => dispatch(failureGetByUserID(error.toString()))
            );
    };
}


function requestGetByUserID(id) {
    return {type: clientConstants.GET_BY_USER_REQUEST, id}
}

function successGetByUserID(client) {
    return {type: clientConstants.GET_BY_USER_SUCCESS, client}
}

function failureGetByUserID(id, error) {
    return {type: clientConstants.GET_BY_USER_FAILURE, id, error}
}


function getDetailsByCode(clientCode) {
    return dispatch => {
        dispatch(requestGetDetailsByCode(clientCode));
        clientService.getDetailsByCode(clientCode)
            .then(
                clientDetails => {
                    dispatch(successGetDetailsByCode(clientDetails, clientCode));
                },
                error => dispatch(failureGetDetailsByCode(error.toString()))
            );
    };
}

function requestGetDetailsByCode(clientCode) {
    return {type: clientConstants.GET_DETAILS_BY_CODE_REQUEST, clientCode}
}

function successGetDetailsByCode(clientDetails, clientCode) {
    return {type: clientConstants.GET_DETAILS_BY_CODE_SUCCESS, clientDetails, clientCode}
}

function failureGetDetailsByCode(clientCode, error) {
    return {type: clientConstants.GET_DETAILS_BY_CODE_FAILURE, clientCode, error}
}
