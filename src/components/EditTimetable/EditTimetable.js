import axios from "axios";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import Header from "../Header/Header";
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";

function EditTimetable(props) {

    const { auth, set_auth, username } = props

    useEffect(() => {
        authenticate()
    }, [])

    console.log(auth)
    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "50px"}}>Edit Timetable</h1>
            </>
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

export default connect(matchStateToProps, mapDispatchToProps)(EditTimetable);