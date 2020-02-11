import {clientConstants} from '../constants';
import {userConstants} from '../constants';
import update from 'immutability-helper';


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
        case clientConstants.SET_NEXT_CALL_TIME_SUCCESS:
            for (const id in state.client) {
                if (state.client[id].client_code === action.client_code) {
                    const newData = update(state, {
                        client: {[id]: {next_call: {$set: new Date(Date.parse(action.callTime)).toISOString()}}}
                    });
                    return client(state = newData, action = {type: clientConstants.SET_CALL_RATIO, index: id});
                }
            }
            return state;
        case clientConstants.SET_CALL_RATIO:
            const clientData = state.client[action.index];
            const now = Date.now();
            const lastCall = Date.parse(clientData.last_call);
            const nextCall = Date.parse(clientData.next_call);
            const passed = now - lastCall;
            const duration = nextCall - lastCall;
            let ratio = (passed / duration);

            const newData = update(state, {
                client: {[action.index]: {ratio: {$set: ratio.toString()}, ratio_sort: {$set: ratio}}}
            });
            return client(state, {type: clientConstants.SET_ALL_CALL_RATIO});


        case clientConstants.SET_ALL_CALL_RATIO:
            const newstate = state.client.map(function (clientData, index) {
                    const now = Date.now();
                    const lastCall = Date.parse(clientData.last_call);
                    const nextCall = Date.parse(clientData.next_call);
                    const passed = now - lastCall;
                    const duration = nextCall - lastCall;
                    let ratio = (passed / duration);
                    const newData = update(clientData, {
                        ratio: {$set: ratio.toString()}, ratio_sort: {$set: ratio}
                    });
                    return newData;
                }
            );
            return {...state, client: newstate};


        case clientConstants.GET_BY_USER_REQUEST:
            return Object.assign({}, state, {
                loading: true,
            });
        case clientConstants.GET_BY_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                client: action.client
            });
        case clientConstants.GET_BY_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error
            });
        case clientConstants.GET_DETAILS_BY_CODE_REQUEST:
            return state;
        case clientConstants.GET_DETAILS_BY_CODE_SUCCESS:
            let details = Object.assign({}, state.clientDetails, {
                [action.clientCode]: action.clientDetails,
            });
            let client_code = state.activeClient;
            let last_call = null;
            let next_call = null;
            if (client_code === undefined) {
                console.log(details);
                console.log("active client is undefined");
                return state;
            }
            try {
                 last_call = details[client_code].last_call;
                 next_call = details[client_code].next_call;
            } catch {
                return state;
            }
            const newState = Object.assign({}, state, {
                clientDetails: details,
            });
            try {
                let obj = newState.client.find(o => o.client_code === client_code);
                obj.last_call = last_call;
                obj.next_call = next_call;
            } catch {
                return newState;
            }
            return newState;

        case clientConstants.GET_DETAILS_BY_CODE_FAILURE:
            return {
                error: action.error
            };
        case clientConstants.SET_ACTIVE_CLIENT:
            return Object.assign({}, state, {
                activeClient: action.clientCode,
            });
        case  clientConstants.CREATE_NEW_CONTACT_SUCCESS:
            return state;
        case clientConstants.SET_CALL_INTERVAL_SUCCESS:
            return update(state, {
                    clientDetails: {
                        [action.client_code]: {
                            call_interval: {$set: action.call_interval}
                        }
                    }
                }
            );

        default:
            return state
    }
}
