import {uiConstants} from '../constants';

const INITIAL_STATE = {
    tabIndex: 0,
};

export function ui(state = INITIAL_STATE, action) {
    switch (action.type) {
        case uiConstants.SET_TAB_INDEX:
            return {
                tabIndex: action.tabIndex,
            };
        default:
            return state
    }
}
