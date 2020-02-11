import {authHeader, JSONauthHeader} from '../helpers/auth-header';
import {config} from '../constants';

//const config =  {apiUrl: 'http://localhost:8000'};
//const config =  {apiUrl: 'https://fmc-crm-252016.appspot.com'};

export const clientPhoneNumbersService = {
    getByContactID,
    makeCall,
    addNumber
};

function addNumber(data) {
    const requestOptions = {
        method: 'POST',
        headers: JSONauthHeader(),
        body: JSON.stringify(data)
    };
    console.log('###########ADD NUMBER SERVICE ##############');
    console.log(data);
    console.log('###########ADD NUMBER SERVICE ##############');
    return fetch(`${config.apiUrl}/api/clientphonenumbers/`, requestOptions).then(handleResponse);
}
function makeCall(salesID, clientID) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/phone_client/${salesID}/${clientID}`, requestOptions).then(handleResponse);
}

function getByContactID(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/clientphonenumbers/${id}/`, requestOptions).then(handleResponse);
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
