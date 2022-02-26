import axios from 'axios';
import { set_notifications } from "../actions/notificationAction"

const init = {
    notifications : ["No notifications"]
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state
    }
}

export const authenticate = () => async (dispatch, getState) => {
    let notifications = null

    axios.get(`http://localhost:3001/notifications`)
        .then((response) => {
            notifications  = response.data.notifications
        })
        .catch((error) => {
            console.log(error)
        })
    console.log("I am running Thunk Notifications")
    dispatch(set_notifications(notifications))
}

export default authReducer;