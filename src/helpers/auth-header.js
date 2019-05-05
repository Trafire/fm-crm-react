export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        // todo: delete s in JWTs not sure why this was required to work...
        return { 'Authorization': 'JWTs ' + user.token };
    } else {
        return {};
    }
}
