import { salespersonConstants } from '../constants';

const INITIAL_STATE = {

};

export function salesperson(state = INITIAL_STATE, action) {
    switch (action.type) {
        case salespersonConstants.GET_BY_USER_REQUEST:
            return {
                loading: true
            };
        case salespersonConstants.GET_BY_USER_SUCCESS:
            return {
                salesperson: action.salesperson
            };
        case salespersonConstants.GET_BY_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
