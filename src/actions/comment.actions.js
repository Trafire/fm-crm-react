import {commentConstants} from '../constants';
import {commentService} from "../services/comment.service"

export const commentsActions = {
    addComment,
    getByClientID,
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
