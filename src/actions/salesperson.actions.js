import {salespersonConstants} from '../constants';
import {salesPersonService} from "../services/salesperson.service";

export const salespersonActions = {
    getByUserID,
};

function getByUserID(id) {
    return dispatch => {
        dispatch(request(id));
        salesPersonService.getByUserID(id)
            .then(
                salesperson => {
                    dispatch(success(salesperson));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: salespersonConstants.GET_BY_USER_REQUEST, id } }
    function success(salesperson) { return { type: salespersonConstants.GET_BY_USER_SUCCESS, salesperson } }
    function failure(id, error) { return { type: salespersonConstants.GET_BY_USER_FAILURE, id, error } }
}
