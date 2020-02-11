import {notificationConstants} from "../constants";
import update from 'immutability-helper';

const INITIAL_STATE = [];

export function notification(state = INITIAL_STATE, action) {
    switch (action.type) {
        case notificationConstants.MARK_COMPLETE_SUCCESS:
            const id = action.notificationID;
            const index = state.findIndex(function (element) {
                return element.id === id;
            });
            if (state[index].completed.includes(action.clientCode)) {
                return state;
            }
            return update(state, {[index]: {completed: {$push: [action.clientCode]}}});
        case notificationConstants.REMOVE_FROM_COMPLETE_SUCCESS:
            const rid = action.notificationID;
            const rindex = state.findIndex(function (element) {
                return element.id === rid;
            });

            if (state[rindex].completed.includes(action.clientCode)) {
                const clientIndex = state[rindex].completed.indexOf(action.clientCode);
                return update(state, {[rindex]: {completed: {$splice: [[clientIndex, 1]]}}});
            }
            return state;

        case  notificationConstants.GET_NOTIFICATIONS_SUCCESS:
            return update(state, {$set: action.notifications});
        default:
            return state;
    }


}
