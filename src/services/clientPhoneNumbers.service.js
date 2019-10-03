import { authHeader } from '../helpers/auth-header';

//const config =  {apiUrl: 'http://localhost:8000'};
const config =  {apiUrl: 'https://fmc-crm-252016.appspot.com'};

export const clientPhoneNumbersService = {
    getByContactID,
    makeCall,
};


function makeCall(salesID, clientID) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/phone_client/${salesID}/${clientID}`, requestOptions);
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
