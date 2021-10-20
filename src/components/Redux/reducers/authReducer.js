const init = {
    auth: false
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case 'AUTHENTICATE_USER':
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state
    }
}

export default authReducer;