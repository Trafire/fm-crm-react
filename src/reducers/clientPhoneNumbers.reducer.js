import {clientPhoneNumberConstants} from '../constants';

const INITIAL_STATE = {};

export function clientPhoneNumber(state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
        case clientPhoneNumberConstants.GET_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                [action.id]: action.contact, //todo
            });
        default:
            return state;
    }
}
