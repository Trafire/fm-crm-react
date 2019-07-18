import {clientConstants, commentConstants} from "../constants"

const INITIAL_STATE = {
    comments: [],
};

export function comment(state = INITIAL_STATE, action) {
    switch (action.type) {
        case commentConstants.GET_BY_ID_SUCCESS:
            return  Object.assign({}, state, {
                comments: action.comments,
            });
        case commentConstants.GET_BY_ID_FAILURE:
            return  Object.assign({}, state, {
                error: action.error
            });
        default:
            return state;
    }
}
