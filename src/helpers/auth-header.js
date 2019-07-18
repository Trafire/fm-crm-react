export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        // todo: delete s in JWTs not sure why this was required to work...
        return {'Authorization': 'JWTs ' + user.token};
    } else {
        return {};
    }
}

export function JSONauthHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'JWTs ' + user.token,);
        myHeaders.append('Content-Type', 'application/json');
        return myHeaders;
        // todo: delete s in JWTs not sure why this was required to work...
        return {

            'Authorization': 'JWTs ' + user.token,
            'content-type': 'application/json',
            //'Content-Type': 'application/json',
        };
    } else {
        return {};
    }
}
