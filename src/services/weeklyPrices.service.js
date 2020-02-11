import {authHeader, JSONauthHeader} from '../helpers/auth-header';
import {config} from '../constants';


export const weeklyPriceService = {
    getUnpricedByWeek,
    setPrice,
    getPricesByWeek,
    getNumberOfUnpriced
};

function setPrice(id, price) {
    const requestOptions = {
        method: 'PATCH',
        headers: JSONauthHeader(),
        body: JSON.stringify({price})
    };
    return fetch(`${config.apiUrl}/f2/weeklyprices/${id}/`, requestOptions).then(handleResponse);
}
function getUnpricedByWeek(year,week) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/price/unpriced/${year}/${week}/`, requestOptions).then(handleResponse);
}

function getPricesByWeek(year,week) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/weeklyprices/?week=${week}&year=${year}`, requestOptions).then(handleResponse);
}

function getNumberOfUnpriced(week, year, system='f2_canada_real') {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/prices/count_open/${system}/${year}/${week}/`, requestOptions).then(handleResponse);
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
