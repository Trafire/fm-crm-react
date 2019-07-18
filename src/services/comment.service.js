import { authHeader,JSONauthHeader } from '../helpers/auth-header';

const config =  {apiUrl: 'http://localhost:8000'};

export const commentService = {
    addComment,
    getCommentsById
};
function getCommentsById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/comments/`, requestOptions).then(handleResponse);
}
function addComment(data) {
    const requestOptions = {
        method: 'POST',
        headers: JSONauthHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/api/comments/create`, requestOptions).then(handleResponse);
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
