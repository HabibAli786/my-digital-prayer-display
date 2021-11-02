import axios from "axios";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";

function UploadTimetable(props) {

    const { auth, set_auth, username } = props

    useEffect(() => {
        authenticate()
    }, [])

    console.log(auth)
    
    if(!auth) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <h1>UploadTimetable</h1>
        )
    }
}

const matchStateToProps = state => ({
    auth : state.admin.auth,
    username : state.admin.username
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
        set_auth : (auth) => dispatch(set_auth(auth)),
        set_username : (username) => dispatch(set_username(username))
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(UploadTimetable);