import {clientConstants} from '../constants';
var dotProp = require('dot-prop-immutable');

const INITIAL_STATE = {
    activeClient: "",
    client: [],
    clientDetails: {
        contact_id: [],
    }
};

export function client(state = INITIAL_STATE, action) {
    switch (action.type) {
        case clientConstants.GET_BY_USER_REQUEST:
            return  Object.assign({}, state, {
                loading: true,
            });
        case clientConstants.GET_BY_USER_SUCCESS:
            return  Object.assign({}, state, {
                loading: false,
                client: action.client
            });
        case clientConstants.GET_BY_USER_FAILURE:
            return  Object.assign({}, state, {
                error: action.error
            });
        case clientConstants.GET_DETAILS_BY_CODE_REQUEST:
            return state;
        case clientConstants.GET_DETAILS_BY_CODE_SUCCESS:
            let details = Object.assign({}, state.clientDetails, {
                [action.clientCode]: action.clientDetails,
            });
            return  Object.assign({}, state, {
                clientDetails: details,
            });
        case clientConstants.GET_DETAILS_BY_CODE_FAILURE:
            return {
                error: action.error
            };
        case clientConstants.SET_ACTIVE_CLIENT:
            return  Object.assign({}, state, {
                activeClient: action.clientCode,
            });
        case  clientConstants.CREATE_NEW_CONTACT_SUCCESS:
            return state;
        case clientConstants.SET_NEXT_CALL_TIME_SUCCESS:
            let d = new Date(action.callTime).toISOString();
            //d = d.slice(0,-1)  + "000z";
            return dotProp.set(state, `clientDetails.${action.client_code}.next_call`, d);
            /*return  {...state,
                clientDetails: {
                    ...state.clientDetails,
                    [action.client_code]: {
                        last_call: d,
                    }
                }};*/

        default:
            return state
    }
}
