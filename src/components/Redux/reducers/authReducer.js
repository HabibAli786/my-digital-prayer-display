import axios from 'axios';
import Cookies from 'universal-cookie';
import { set_auth, set_username } from '../actions/authAction'

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
    // const cookies = new Cookies();
    // let auth = null
    // let username = null
    console.log("I am running Thunk")
    // await axios({
    //     method: 'GET',
    //     withCredentials: true,
    //     url: 'http://localhost:3001/admin/user'
    // }).then((res) => {
    //     console.log(res)
    //     const data = res.data
    //     console.log(data.username)
    //     if(data.username) {
    //         username = data.username
    //         auth = "Successfully Authenticated"
    //     } else if(data === "Unsuccessfully Authenticated") {
    //         auth = "Unsuccessfully Authenticated"
    //     }
    // }).catch((error) => {
    //     console.log(error)
    //     auth = "Server Offline"
    // })
    // dispatch(set_auth(auth))
    // dispatch(set_username(username))
}

export default authReducer;