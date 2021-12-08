import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Redirect } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header/Header'
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";
import './EditNotifications.css'

function EditNotifications(props) {

    const dispatch = useDispatch()
    const { auth } = props

    const [notifications, setNotifications] = useState([])

    const getNotifications = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/notifications'
        }).then((res) => {
            // console.log(res.data)
            const data = res.data.notifications
            if(data.length >= 1) {
                setNotifications(data)
            } else {
                setNotifications([])
            }
        })
    }

    const deleteNotification = (notification) => {
        axios({
            method: 'POST',
            data: {
                toDelete : notification
            },
            withCredentials: true,
            url: 'http://localhost:3001/notifications/delete'
        })
        .then((res) => {
            console.log(res.data)
            getNotifications()
        })
    }

    const addNotification = (event) => {
        // console.log(event)
        event.preventDefault()
        const data = event.target.notification.value
        axios({
            method: 'POST',
            data: {
                toAdd : data
            },
            withCredentials: true,
            url: 'http://localhost:3001/notifications/add'
        })
        .then((res) => {
            console.log(res.data)
            getNotifications()
            event.target.reset()
        })
    }

    useEffect(() => {
        dispatch(authenticate())
        getNotifications()
    }, [notifications.length])

    console.log(notifications)
    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 className="edit-notification-title">Edit Notifications</h1>
            <Container className="edit-notifications-container">
                <Row className="notification-header-row">
                        <h1 className="edit-notification-header">List of Notifications</h1>
                </Row>
                <div className="notification-container">
                    {notifications.length > 0 && notifications.map(
                        notification => 
                        <Row key={uuidv4()} className="notification-row">
                            <Col className="notifications" lg={10}>
                                <Card body>{notification}</Card>
                            </Col>
                            <Col lg={2}>
                                <Button variant="danger" className="notification-button" onClick={() => deleteNotification(notification)}>Delete</Button>
                            </Col>
                        </Row>
                    ) }
                    {notifications.length <= 0 &&
                    <Row className="notification-row">
                        <Col className="notifications" lg={10}>
                            <Card body>No Notifications Currently</Card>
                        </Col>
                    </Row> }
                    
                </div>
                
                <Row className="new-notification-header-row">
                    <h1 className="new-notification-header">New Notifications</h1>
                </Row>
                <Row className="new-notification-row">
                <Form onSubmit={addNotification}>
                    <Col className="notifications" lg={10}>
                        <Form.Group className="mb-3">
                            <Form.Control name="notification" className="new-notification-input" type="text" placeholder="Enter New Notification Here" />
                        </Form.Group>
                    </Col>
                    <Col lg={2}>
                        <Button variant="primary" type="submit" className="notification-button">Add</Button>
                    </Col>
                </Form>
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