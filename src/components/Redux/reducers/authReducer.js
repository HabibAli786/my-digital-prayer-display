const init = {
    auth: false,
    username : null
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case 'AUTHENTICATE_USER':
            return {
                ...state,
                auth: action.payload
            }
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}

export default authReducer;