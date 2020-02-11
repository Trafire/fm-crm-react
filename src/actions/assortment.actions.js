import {assortmentConstants} from '../constants';
import {assortmentService} from "../services/assortment.service"


export const assortmentActions = {
    getAssortment,
    getFullAssortment,
};

function getAssortment(code) {
    return dispatch => {
        dispatch(request(code));
        assortmentService.getAssortmentByCode(code)
            .then(
                assortment => {
                    dispatch(success(code, assortment));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(code) {
        return {type: assortmentConstants.GET_ASSORTMENT_BY_CODE_REQUEST, code}
    }

    function success(id, data) {
        return {type: assortmentConstants.GET_ASSORTMENT_BY_CODE_SUCCESS, code, data}
    }

    function failure(id, error) {
        return {type: assortmentConstants.GET_ASSORTMENT_BY_CODE_FAILURE, code, error}
    }
}

function getFullAssortment(code) {
    return dispatch => {
        dispatch(request(code));
        assortmentService.getFullAssortment(code)
            .then(
                assortment => {
                    dispatch(success(code, assortment));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(code) {
        return {type: assortmentConstants.GET_FULL_ASSORTMENT_REQUEST, code}
    }

    function success(id, data) {
        return {type: assortmentConstants.GET_FULL_ASSORTMENT_SUCCESS, code, data}
    }

    function failure(id, error) {
        return {type: assortmentConstants.GET_FULL_ASSORTMENT_FAILURE, code, error}
    }
}
