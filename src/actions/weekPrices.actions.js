import {weeklyPricesConstants} from '../constants';
import {weeklyPriceService} from "../services/weeklyPrices.service"


export const weeklyPricesActions = {
    getUnpricedByWeek,
    setPrice,
};
function setPrice(id, year, week, assortment_code, price) {
    return dispatch => {
        dispatch(request(year, week, assortment_code, price));
        weeklyPriceService.setPrice(id, price)
            .then(
                items => {
                    dispatch(success(year, week, assortment_code, price));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() {
        return {type: weeklyPricesConstants.SET_WEEKLY_PRICE_REQUEST, year, week, assortment_code, price}
    }

    function success() {
        return {type: weeklyPricesConstants.SET_WEEKLY_PRICE_SUCCESS, year, week, assortment_code, price}
    }

    function failure(id, error) {
        return {type: weeklyPricesConstants.SET_WEEKLY_PRICE_FAILURE, error}
    }
}

function getUnpricedByWeek(year, week) {
    return dispatch => {
        dispatch(request(year, week));
        weeklyPriceService.getPricesByWeek(year, week)
            .then(
                items => {
                    dispatch(success(year, week, items));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) {
        return {type: weeklyPricesConstants.GET_WEEKLY_PRICES_BY_WEEK_YEAR_REQUEST, year, week}
    }

    function success(year, week, items) {
        return {type: weeklyPricesConstants.GET_WEEKLY_PRICES_BY_WEEK_YEAR_SUCCESS, year, week, items}
    }

    function failure(id, error) {
        return {type: weeklyPricesConstants.GET_WEEKLY_PRICES_BY_WEEK_YEAR_FAILURE, error}
    }
}
