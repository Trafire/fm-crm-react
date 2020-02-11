import {authHeader, JSONauthHeader} from '../helpers/auth-header';
import {config} from '../constants';


export const assortmentService = {
    getAssortmentByCode,
    getFullAssortment,
};
function getAssortmentByCode(code) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/assortment/${code}/`, requestOptions).then(handleResponse);
}

function getFullAssortment() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/f2/f2assortment/`, requestOptions).then(handleResponse);
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
