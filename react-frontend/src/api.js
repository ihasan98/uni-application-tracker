const APIURL = '/api/users/';

export async function getUsers() {
    return fetch(APIURL)
    .then(resp => {
        if(!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage : data.message};
                    throw err;
                });
            } else {
                let err = {errorMessage: "Server is not responding! Please try again!"}
                throw err;
            }
        }
        return resp.json();
    });
}

export async function createUser(userInput) {
    return fetch(APIURL, {
        method: 'post',
        headers: new Headers({
            'Content-Type' : 'application/json',
        }),
        body: JSON.stringify({...userInput})
    })
    .then(resp => {
        if (!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage : data.message};
                    throw err;
                });
            } else {
                let err = {errorMessage: "Server is not responding!"}
                throw err;
            }
        }
        return resp.json();
    });
}

export async function removeUser(id) {
    const DELETEURL = APIURL + id;
    return fetch(DELETEURL, {
        method: 'delete'
    })
    .then(resp => {
        if (!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage : data.message};
                    throw err;
                });
            } else {
                let err = {errorMessage: "Server is not responding!"}
                throw err;
            }
        }
        return resp.json();
    });
}