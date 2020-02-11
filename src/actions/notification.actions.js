import {notificationConstants} from "../constants"
import {notificationService} from "../services/notification.service";



export const notificationActions = {
    markComplete,
    removeComplete,
    getNotifications,
};
function markComplete(clientCode, notificationID) {
    return dispatch => {
        dispatch(request());
        const data = {
            client_code:  clientCode,
            completed: notificationID
        };
        notificationService.markComplete(data)
            .then(
                notifications => {
                    dispatch(success(clientCode, notificationID));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: notificationConstants.MARK_COMPLETE_REQUEST } }
    function success(clientCode, notificationID) {
        return {type: notificationConstants.MARK_COMPLETE_SUCCESS, clientCode,notificationID};
    }
    function failure(error) { return { type: notificationConstants.MARK_COMPLETE_FAILURE, error } }
}
function removeComplete(clientCode, notificationID) {

    return dispatch => {
        dispatch(request());
        notificationService.unMarkComplete(clientCode, notificationID)
            .then(
                notifications => {
                    dispatch(success(clientCode, notificationID));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function success(clientCode, notificationID) {
        return {type: notificationConstants.REMOVE_FROM_COMPLETE_SUCCESS, clientCode,notificationID};
    }
    function request() { return { type: notificationConstants.REMOVE_FROM_COMPLETE_REQUEST } }
    function failure() { return { type: notificationConstants.REMOVE_FROM_COMPLETE_FAILURE } }

}
function getNotifications() {
    return dispatch => {
        dispatch(request());
        notificationService.getNotifications()
            .then(
                notifications => {
                    dispatch(success(notifications));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: notificationConstants.GET_NOTIFICATIONS_REQUEST } }
    function success(notifications) { return { type: notificationConstants.GET_NOTIFICATIONS_SUCCESS, notifications} }
    function failure(error) { return { type: notificationConstants.GET_NOTIFICATIONS_FAILURE, error } }
}

