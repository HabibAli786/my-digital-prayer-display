import axios from 'axios';
import { set_notifi } from "../actions/notificationAction"

const init = {
    notifications : true,
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

export const setNotifi = () => async (dispatch, getState) => {
    let source = axios.CancelToken.source();
    // console.log("I am running in thunk")
    let notifications = null

    axios.get(`http://localhost:3001/notifications`)
        .then((response) => {
            // console.log(response.data.notifications)
            if(response.data.notifications) {
                notifications = response.data.notifications
                // console.log(notifications)
                dispatch(set_notifi(notifications))
            }
        })
        .catch((error) => {
            console.log(error)
            notifications = ["No Notifications"]
    })
    source.cancel("Cancelling in cleanup");
}

export default notificationReducer;