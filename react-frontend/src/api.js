const USERAPI = '/api/users/';
const UNIAPI = '/api/unis/';

export async function getUsers() {
    return fetch(USERAPI)
    .then(resp => { return ValidateHTTPStatus(resp) });
}

export async function createUser(userInput) {
    return fetch(USERAPI, {
        method: 'post',
        headers: new Headers({
            'Content-Type' : 'application/json',
        }),
        body: JSON.stringify({...userInput})
    })
    .then(resp => { return ValidateHTTPStatus(resp) });
}

export async function removeUser(id) {
    const DELETEURL = USERAPI + id;
    return fetch(DELETEURL, {
        method: 'delete'
    })
    .then(resp => { return ValidateHTTPStatus(resp) });
}

export async function getUnis() {
    return fetch(UNIAPI)
    .then(resp => { return ValidateHTTPStatus(resp) });
}

export async function createUni(uniInput) {
    return fetch(UNIAPI, {
        method: 'post',
        headers: new Headers({
            'Content-Type' : 'application/json',
        }),
        body: JSON.stringify({...uniInput})
    })
    .then(resp => { return ValidateHTTPStatus(resp) });
}

export async function removeUni(id) {
    const DELETEURL = UNIAPI + id;
    return fetch(DELETEURL, {
        method: 'delete'
    })
    .then(resp => { return ValidateHTTPStatus(resp) });
}

function ValidateHTTPStatus(resp){
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
}