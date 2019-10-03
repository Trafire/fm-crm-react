import { authHeader } from '../helpers/auth-header';

//const config =  {apiUrl: 'http://localhost:8000'};
const config =  {apiUrl: 'https://fmc-crm-252016.appspot.com'};
export const contactService = {
    getByContactID,
    getBySalesID,
    getCallsMade,
    setCallAnswerStatus,
};

function setCallAnswerStatus(id, status) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/setanswerstatus/${id}/${status}`, requestOptions).then(handleResponse);
}

function getCallsMade(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/callsmade/${id}`, requestOptions).then(handleResponse);
}

function getByContactID(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/contacts/${id}/`, requestOptions).then(handleResponse);
}

function getBySalesID(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/contacts/${id}/contacts_list/`, requestOptions).then(handleResponse);
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
