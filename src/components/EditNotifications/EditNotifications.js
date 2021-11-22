import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from 'react-router';

import Header from '../Header/Header'
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";
import './EditNotifications.css'

function EditNotifications(props) {

    const { auth } = props

    useEffect(() => {
        authenticate()
    }, [])
    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "60px"}}>Edit Notifications</h1>
            <Container className="edit-notifications-container">
                <Row className="notification-header-row">
                    <h1 style={{textAlign: "left", fontSize: "45px"}}>List of Notifications</h1>
                </Row>
                <Row className="notification-row">
                    <Col className="notifications" lg={10}>
                        <Card body>Hello</Card>
                    </Col>
                    <Col lg={2}>
                        <Button variant="danger" className="notification-button">Delete</Button>
                    </Col>
                </Row>
                <Row className="notification-row">
                    <Col className="notifications" lg={10}>
                        <Card body>Hello</Card>
                    </Col>
                    <Col lg={2}>
                        <Button variant="danger" className="notification-button">Delete</Button>
                    </Col>
                </Row>
                
                <Row className="new-notification-header-row">
                    <h1 style={{textAlign: "left", fontSize: "45px"}}>New Notifications</h1>
                </Row>
                <Row className="notification-row">
                    <Col className="notifications" lg={10}>
                        <Card body>Hello</Card>
                    </Col>
                    <Col lg={2}>
                        <Button variant="primary" className="notification-button">Add</Button>
                    </Col>
                </Row>
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