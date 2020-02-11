import {authHeader, JSONauthHeader} from '../helpers/auth-header';
import {config} from '../constants';

export const emailService = {
    getByEmailID,
    addEmailAddress,
};


function addEmailAddress(data) {
    const requestOptions = {
        method: 'POST',
        headers: JSONauthHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/api/emailaddress/`, requestOptions).then(handleResponse);
}

function getByEmailID(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/emailaddress/${id}/`, requestOptions).then(handleResponse);
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
