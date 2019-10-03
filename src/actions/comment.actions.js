import {commentConstants} from '../constants';
import {commentService} from "../services/comment.service"

export const commentsActions = {
    addComment,
    getByClientID,
    deleteComment,
    getCommentsByClient,
};

function getByClientID(id) {
    return dispatch => {
        dispatch(request(id));
        commentService.getCommentsById(id)
            .then(
                comments => {
                    dispatch(success(id, comments));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) {
        return {type: commentConstants.GET_BY_ID_REQUEST, id}
    }

    function success(id, comments) {
        return {type: commentConstants.GET_BY_ID_SUCCESS, id, comments}
    }

    function failure(id, error) {
        return {type: commentConstants.GET_BY_ID_FAILURE, id, error}
    }
}

function getCommentsByClient(clientCode) {
    return dispatch => {
        dispatch(request(clientCode));
        commentService.getCommentsByClient(clientCode)
            .then(
                comments => {
                    dispatch(success(clientCode, comments));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(clientCode) {
        return {type: commentConstants.GET_BY_CLIENT_CODE_REQUEST, clientCode}
    }

    function success(clientCode, comments) {
        return {type: commentConstants.GET_BY_CLIENT_CODE_SUCCESS, clientCode, comments}
    }

    function failure(clientCode, error) {
        return {type: commentConstants.GET_BY_CLIENT_CODE_FAILURE, clientCode, error}
    }
}


function addComment(time, text, salesperson_id, client_id, call_id, sticky = false) {
    const data = {time, 'comment': text, salesperson_id, client_id, 'call': call_id, sticky};
    return dispatch => {
        commentService.addComment(data)
            .then(
                id => {
                    dispatch(success(id));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function success(id) {
        return {type: commentConstants.GET_BY_ID_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: commentConstants.GET_BY_ID_FAILURE, id, error}
    }
}

function deleteComment(id) {
    return dispatch => {
        commentService.deleteComment(id)
            .then(
                id => {
                    dispatch(success(id));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function success(id) {
        return {type: commentConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: commentConstants.DELETE_FAILURE, id, error}
    }

}
