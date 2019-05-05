import {uiConstants} from '../constants';

export const uiActions = {
    setTab,
};
function setTab (index) {
    return {
        type: uiConstants.SET_TAB_INDEX,
        tabIndex: index,
    }
}


