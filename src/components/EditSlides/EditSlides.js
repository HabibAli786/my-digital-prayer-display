import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Redirect } from 'react-router';

import Header from '../Header/Header'
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";
import './EditSlides.css'

function EditNotifications(props) {

    const dispatch = useDispatch()
    const { auth } = props


    useEffect(() => {
        dispatch(authenticate())
    }, [])
    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "60px"}}>Edit Slides</h1>
            <Container>
                
            </Container>
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

export default connect(matchStateToProps, mapDispatchToProps)(EditNotifications);