import {config} from '../constants';
import { authHeader,JSONauthHeader } from '../helpers/auth-header';

export const openOrdersService = {
    getNumberOfOpenOrders,
    getOrdersInShipment,
    getOpenOrders,
};
function getOpenOrders(week, year, system='f2_canada_real') {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/openorders/${system}/${year}/${week}/`, requestOptions).then(handleResponse);
}

function getOrdersInShipment(week, year, system='f2_canada_real') {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/distribution/quantity_to_distribute/${system}/${year}/${week}/`, requestOptions).then(handleResponse);
}

function getNumberOfOpenOrders(week, year, system='f2_canada_real') {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/openorders/count/${system}/${year}/${week}/`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
