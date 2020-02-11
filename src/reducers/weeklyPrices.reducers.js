import {weeklyPricesConstants} from "../constants"
import update from 'immutability-helper';


const INITIAL_STATE = {};

export function weeklyPrices(state = INITIAL_STATE, action) {
    switch (action.type) {
        case weeklyPricesConstants.SET_WEEKLY_PRICE_SUCCESS:
            return state;
        case weeklyPricesConstants.GET_WEEKLY_PRICES_BY_WEEK_YEAR_SUCCESS:
            if (action.items.length === 0) {
                return state;
            }
            if (!state.hasOwnProperty(action.year)) {

                const s = update(state,
                    {
                        $set: {
                            [action.year]: {}
                        }
                    }
                );
                s[action.year][action.week] = action.items;
                return s;
            } else {
                return update(state, {[action.year]: {$merge: {[action.week]: action.items}}})
            }
        default:
            return state;
    }
}
