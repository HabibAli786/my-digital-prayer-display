import axios from 'axios';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Redirect } from 'react-router';

import './User.css'
import Footer from '../Footer/Footer';

function User(props) {

    const [auth, setAuth] = useState(false)
    const [UserData, setUserData] = useState({username: null})

    const getUserData = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/user'
        }).then((res) => {
            console.log(res.data)
            const data = res.data
            if(data.username) {
                setUserData({
                    username: data.username
                })
            }
        })
    }

    const Logout = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/logout'
        }).then((res) => {
            console.log(res.data)
            if(res.data === "Logged out") {
                setAuth("Not Authenticated")
            } else {
                setAuth("Authenticated")
            }
        })
    }

    useEffect(() => {
        if(props.location.state) {
            if(props.location.state.auth === true) {
                setAuth("Authenticated")
                getUserData()
            } else {
                setAuth("Not Authenticated")
            }
        } else {
            setAuth("Not Authenticated")
        }
    }, [])

    if(auth === "Not Authenticated") {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <Container>
                <Row className="mt-5 user-title-row">
                    <h1 className="user-title">Welcome Back, {UserData.username}</h1>
                </Row>
                <Row className="user-subheading-row">
                    <p className="mt-2 user-subheading">Please select below what you would like to do today</p>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button className="button-options" variant="outline-primary" size="lg">Upload Timetable</Button>
                    </Col>
                    <Col>
                        <Button className="button-options" variant="outline-primary" size="lg">Edit Timetable</Button>
                    </Col>
                    <Col>
                        <Button className="button-options" variant="outline-primary" size="lg">Upload Logo</Button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Button className="button-options" variant="outline-primary" size="lg">Edit Notifications</Button>
                    </Col>
                    <Col>
                    
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row className="user-logout-row">
                    <Col>

                    </Col>
                    <Col>
                        <Button className="user-logout" onClick={Logout}>Logout</Button>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
            {/* <h1>Welcome to your Admin Page, {UserData.username}</h1> */}
            <Footer />
            </>
        )
    }
}

export default User