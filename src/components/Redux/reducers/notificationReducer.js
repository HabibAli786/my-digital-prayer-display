import axios from 'axios';
import { set_notifications } from "../actions/notificationAction"

const init = {
    notifications : ["No notifications"]
}

const notificationReducer = (state = init, action) => {
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

export const setNotifications = () => async (dispatch, getState) => {
    console.log("I am running in thunk")
    let notifications = null

    axios.get(`http://localhost:3001/notifications`)
        .then((response) => {
            notifications  = response.data.notifications
        })
        .catch((error) => {
            console.log(error)
        })
    console.log("I am running Thunk Notifications")
    // dispatch(set_notifications(notifications))
    console.log(notifications)
}

export default notificationReducer;