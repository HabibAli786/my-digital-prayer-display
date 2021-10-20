export const set_auth = (result) => {
    return {
        type: 'AUTHENTICATE_USER',
        payload: result
    };
};