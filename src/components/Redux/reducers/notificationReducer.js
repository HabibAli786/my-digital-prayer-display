const init = {
    notifications : ["No Notifications"],
    count: 0
}

const notificationReducer = (state = init, action) => {
    // console.log(action.payload)
    switch(action.type) {
        case 'SET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload
            }
        case 'SET_COUNT':
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}

export default notificationReducer;