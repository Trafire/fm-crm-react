//import config from 'config';
import { authHeader } from '../helpers/auth-header';

const config =  {apiUrl: 'http://localhost:8000'};

export const clientService = {
    getByUserID,
    getDetailsByCode,
    addContact,
    addContactNumber,
    addContactEmail,
};


function addContact(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data

    };
    return fetch(`${config.apiUrl}/api/contacts/`, requestOptions).then(handleResponse);
}

function addContactEmail(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data
    };
    return fetch(`${config.apiUrl}/api/emailaddress/`, requestOptions).then(handleResponse);
}

function addContactNumber(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data
    };
    return fetch(`${config.apiUrl}/api/clientphonenumbers/`, requestOptions).then(handleResponse);
}


function getByUserID(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/salesperson/call_list/${id}`, requestOptions).then(handleResponse);
}

function getDetailsByCode(clientCode) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/clients/${clientCode}?format=json`, requestOptions).then(handleResponse);
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
