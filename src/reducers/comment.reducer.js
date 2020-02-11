import {clientConstants, commentConstants} from "../constants"
import update from 'immutability-helper';

const INITIAL_STATE = {
    comments: [],
};

export function comment(state = INITIAL_STATE, action) {
    switch (action.type) {
        case commentConstants.ADD_COMMENT:
            return update(state, {comments: {$push: [action.data[0]]}});

        case commentConstants.GET_BY_ID_SUCCESS:
            return  Object.assign({}, state, {
                comments: action.comments,
            });
        case commentConstants.GET_BY_CLIENT_CODE_SUCCESS:
            return  Object.assign({}, state, {
                comments: action.comments,
            });
        case commentConstants.GET_BY_ID_FAILURE:
            return  Object.assign({}, state, {
                error: action.error
            });
        case commentConstants.DELETE_SUCCESS:
            return update(state, {
                comments:
                    {$splice: [[action.index, 1]] }});
        default:
            return state;
    }
}
