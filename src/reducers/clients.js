import expect from 'expect';
import {CLIENTS_CHANGE_FOCUS, CLIENTS_ADD} from '../constants/actionTypes'


const INITIAL_STATE = {
    clientIndex: 0,
    clients_list: [],
    client:[],
};
const clientReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLIENTS_CHANGE_FOCUS:
            return Object.assign({}, state, {clientIndex: action.clientIndex});
        case (CLIENTS_ADD):
            const new_state = Object.assign({}, state);
            new_state.clients_list.push(action.client);
            return new_state;
        default:
            return state;
    }
};

expect(clientReducer(INITIAL_STATE,
    {type: CLIENTS_CHANGE_FOCUS, clientIndex: 3}))
    .toEqual({
        clientIndex: 3,
        clients_list: [],
    });

const ctrem = {
    objectID: 0,
    clientCode: "CT*REM",
    clientName: "San Remo",
    address: "530 KEELE STREET",
    postal: "",
    city: "Toronto",
    country: "",
    phone: [{objectID: 0, description: "number_type", number: "416-606-4980"}],
    regionCode: "",
    lastCall: null,
    callInterval: 7,
    salesperson: null,
    invoice_id: [],
    contact_id: [],
    next_call: null,
    comments: [],
};

expect(clientReducer(INITIAL_STATE,
    {type: CLIENTS_ADD, client: ctrem}))
    .toEqual({
        clientIndex: 0,
        clients_list: [ctrem],
    });


export default clientReducer;
