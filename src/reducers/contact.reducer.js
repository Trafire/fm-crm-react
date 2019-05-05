import {contactConstants} from '../constants';

const INITIAL_STATE = {

};

export function contact(state = INITIAL_STATE, action) {
    switch (action.type) {
        case contactConstants.GET_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                [action.id]: action.contact,
            });
        default:
            return state;
    }
}
