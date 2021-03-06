import {salespersonPhoneNumberConstants} from '../constants';

const INITIAL_STATE = {
    active: 1, // todo: needs to update on load not just when changed
};

export function salespersonPhoneNumber(state = INITIAL_STATE, action) {
    switch (action.type) {
        case salespersonPhoneNumberConstants.GET_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                [action.id]: action.contact, //todo
            });
        case salespersonPhoneNumberConstants.SET_SENDER_ID:
            return Object.assign({}, state, {
                active: action.id,
            });
        default:
            return state;
    }
}
