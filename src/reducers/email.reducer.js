import {clientEmailConstants} from '../constants';

const INITIAL_STATE = {};


export function email(state = INITIAL_STATE, action) {

    switch (action.type) {
        case clientEmailConstants.GET_BY_ID_REQUEST:
            return {...state, [action.id]:
                    {loading: true,
                    loaded: false,
            }};
        case clientEmailConstants.GET_BY_ID_SUCCESS:
            return {
                ...state,
                [action.id]: {
                    loading: false,
                    loaded: true,
                    email: action.emailAddress.email,
                    contactID: action.emailAddress.contact_id,
                    description: action.emailAddress.email_description,
                }
            };
        /*case clientEmailConstants.GET_BY_ID_FAILURE:
            return {
                ...state, [action.id]: {
                    error: action.error,
                    loading: false,
                    loaded: false,
                }
            };*/
        case clientEmailConstants.ADD_EMAIL_ADDRESS_FAILURE:
            console.log(action);
        default:
            return state;
    }
}
