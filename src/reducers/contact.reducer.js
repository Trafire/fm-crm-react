import {clientConstants, contactConstants} from '../constants';

const INITIAL_STATE = {
    calls: [],
    contacts: {},
};

export function contact(state = INITIAL_STATE, action) {


    switch (action.type) {
        case contactConstants.GET_BY_ID_SUCCESS:
            let details = Object.assign({}, state.contacts, {
                [action.id]: action.contact,
            });
            return  Object.assign({}, state, {
                contacts: details,
            });

        case contactConstants.GET_CALLS_MADE_BY_CLIENT_SUCCESS:
            return {...state, calls: action.calls};

        case contactConstants.GET_CALLS_MADE_BY_CLIENT_FAILURE:
            return {...state, error: action.error};

        case contactConstants.SET_CALL_ANSWER_STATUS_SUCCESS:
            return state;

        case contactConstants.GET_BY_SALES_SUCCESS:
            return {...state, contacts:  action.contact};
        case contactConstants.ADD_CONTACT_SUCCESS:
            return {...state.contacts, [action.data.contact_id]:  action.data};
        case clientConstants.SET_CONTACT_ID:
            return {...state.clientDetails[action.clientCode],
                contact_id: [...state.clientDetails[action.clientCode].contact_id, action.contactID]};

        default:
            return state;
    }
}
