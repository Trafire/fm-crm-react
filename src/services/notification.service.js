import { authHeader,JSONauthHeader } from '../helpers/auth-header';
import {config} from '../constants';
//const config =  {apiUrl: 'http://localhost:8000'};
//const config =  {apiUrl: 'https://fmc-crm-252016.appspot.com'};

export const notificationService = {
    getNotifications,
    markComplete,
    unMarkComplete,

};
function getNotifications() {
    console.log("SERVICE");
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/notification/`, requestOptions).then(handleResponse);
}


function markComplete(data) {
    const requestOptions = {
        method: 'POST',
        headers: JSONauthHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/api/completed/`, requestOptions).then(handleResponse);
}

function unMarkComplete(clientCode,notificationID) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/completed/delete/${clientCode}/${notificationID}/`, requestOptions).then(handleResponse);
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
