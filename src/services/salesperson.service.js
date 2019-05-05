//import config from 'config';
import { authHeader } from '../helpers/auth-header';

const config =  {apiUrl: 'http://localhost:8000'};

export const salesPersonService = {
    getByUserID,
};


function getByUserID(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/user/salesperson/${id}/`, requestOptions).then(handleResponse);
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
