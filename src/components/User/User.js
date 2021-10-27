import axios from 'axios';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Redirect } from 'react-router';

import './User.css'
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { set_auth, set_username } from '../Redux/actions/authAction';

function User(props) {

    const { auth, set_auth, username } = props

    const Logout = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/logout'
        }).then((res) => {
            console.log(res.data)
            if(res.data === "Logged out") {
                set_auth(false)
            } else {
                set_auth("Authenticated")
            }
        })
    }

    if(!auth) {
        return ( <h1>Auth is {auth}</h1> )
    } else {
        return (
            <>
            <Header />
            <Container>
                <Row className="mt-5 user-title-row">
                    <h1 className="user-title">Welcome Back, {username}</h1>
                </Row>
                <Row className="user-subheading-row">
                    <p className="mt-2 user-subheading">Please select below what you would like to do today</p>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button className="button-options" variant="outline-primary" size="lg" href="/uploadTimetable">Upload Timetable</Button>
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

export default connect(matchStateToProps, mapDispatchToProps)(User);