import {CLIENTS_CHANGE_FOCUS, CLIENTS_ADD} from '../constants/actionTypes'

export function changeFocus(index) {
    return {type:CLIENTS_CHANGE_FOCUS, clientIndex: index};
}

export function addClient(client) {
    return {type:CLIENTS_ADD, client:client };
}
