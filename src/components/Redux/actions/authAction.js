export const set_auth = (result) => {
    return {
        type: 'AUTHENTICATE_USER',
        payload: result
    };
};

export const set_username = (result) => {
    return {
        type: 'SET_USERNAME',
        payload: result
    };
};