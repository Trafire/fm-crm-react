import { authHeader,JSONauthHeader } from '../helpers/auth-header';

//const config =  {apiUrl: 'http://localhost:8000'};
const config =  {apiUrl: 'https://fmc-crm-252016.appspot.com'};

export const commentService = {
    addComment,
    deleteComment,
    getCommentsById,
    getCommentsByClient,
};
function getCommentsById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/comments/${id}`, requestOptions).then(handleResponse);
}

function getCommentsByClient(clientCode) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/comments/client/${clientCode}`, requestOptions).then(handleResponse);
}
function addComment(data) {
    const requestOptions = {
        method: 'POST',
        headers: JSONauthHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/api/comments/create`, requestOptions).then(handleResponse);
}

function deleteComment(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: JSONauthHeader(),
    };
    return fetch(`${config.apiUrl}/api/comments/${id}`, requestOptions).then(handleResponse);
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
