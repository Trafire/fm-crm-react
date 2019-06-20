import {commentConstants, salespersonConstants} from '../constants';
import {commentService} from "../services/comment.service"
import {clientPhoneNumbersService} from "../services/clientPhoneNumbers.service";

export const commentsActions = {
    addComment,
};

function addComment(time, text, salesperson_id, client_id, sticky=false) {
    const data = {time, text, salesperson_id, client_id, sticky};
    return dispatch => {
        commentService.addComment(data)
            .then(
                id => {
                    dispatch(success(id));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function success(id) { return { type: salespersonConstants.GET_BY_USER_SUCCESS, id } }
    function failure(id, error) { return { type: salespersonConstants.GET_BY_USER_FAILURE, id, error } }
}
