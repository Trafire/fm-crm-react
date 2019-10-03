import {contactConstants} from '../constants';
import {contactService} from "../services/contact.service";

export const contactActions = {
    getByContactID,
    getBySalesID,
    getCallsMade,
    setAnswer,
};

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
