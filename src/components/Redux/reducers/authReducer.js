import axios from 'axios';
import { set_username } from '../actions/authAction'

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

export const authenticate = () => async (dispatch, getState) => {
    let auth
    await axios({
        method: 'GET',
        withCredentials: true,
        url: 'http://localhost:3001/admin/user'
    }).then((res) => {
        console.log(res.data)
        const data = res.data
        if(data.username) {
            auth = "Successfully Authenticated"
        }
    })
    dispatch(set_username(auth))
}

export default authReducer;