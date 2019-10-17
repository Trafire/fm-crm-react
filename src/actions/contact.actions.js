import {commentConstants, contactConstants} from '../constants';
import {contactService} from "../services/contact.service";
import {commentService} from "../services/comment.service";
import {clientActions} from "./client.actions";

export const contactActions = {
    addContact,
    getByContactID,
    getBySalesID,
    getCallsMade,
    setAnswer,
};

function addContact(clientID, jobTitle, name, clientCode) {
    const data = {'client_id': clientID, 'job_title': jobTitle, 'name':name,'phone_number_id':[], 'email_id': [] };
    console.log(data);
    return dispatch => {
        contactService.addContact(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function success(data) {
        const contactId = data.contact_id;
        clientActions.getDetailsByCode(clientCode);
        return {type: contactConstants.ADD_CONTACT_SUCCESS, data}

    }

    function failure(id, error) {
        return {type: contactConstants.ADD_CONTACT_FAILURE, id, error}
    }
}
function setAnswer(id, status) {
    return dispatch => {
        dispatch(request(id));
        contactService.setCallAnswerStatus(id, status)
            .then(
                calls => {
                    dispatch(success(id, status));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: contactConstants.SET_CALL_ANSWER_STATUS_REQUEST, id } }
    function success(id, status) { return { type: contactConstants.SET_CALL_ANSWER_STATUS_SUCCESS, id, status} }
    function failure(id, error) { return { type: contactConstants.SET_CALL_ANSWER_STATUS_FAILURE, id, error } }
}

function getCallsMade(id) {
    return dispatch => {
        dispatch(request(id));
        contactService.getCallsMade(id)
            .then(
                calls => {
                    dispatch(success(id, calls));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: contactConstants.GET_CALLS_MADE_BY_CLIENT_REQUEST, id } }
    function success(id, calls) { return { type: contactConstants.GET_CALLS_MADE_BY_CLIENT_SUCCESS, id, calls} }
    function failure(id, error) { return { type: contactConstants.GET_CALLS_MADE_BY_CLIENT_FAILURE, id, error } }
}

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


function getBySalesID(id) {
    return dispatch => {
        dispatch(request(id));
        contactService.getBySalesID(id)
            .then(
                contact => {
                    dispatch(success(id, contact));
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: contactConstants.GET_BY_SALES_REQUEST, id } }
    function success(id, contact) { return { type: contactConstants.GET_BY_SALES_SUCCESS, id, contact} }
    function failure(id, error) { return { type: contactConstants.GET_BY_SALES_FAILURE, id, error }}
}
