import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router';
import { connect, useDispatch} from 'react-redux';

import { authenticate } from '../Redux/reducers/authReducer'
import { set_auth, set_username } from '../Redux/actions/authAction';
import Header from '../Header/Header'

import './Admin.css'

function Admin(props) {

    const dispatch = useDispatch()
    const { auth, set_auth, username, set_username } = props
    // const [userData, setuserData] = useState(false)

    const getUser = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/user'
        }).then((res) => {
            console.log(res.data)
            const data = res.data
            if(data.username) {
                set_username(data.username)
                set_auth("Successfully Authenticated")
            // } else {
            //     setuserData(false)
            //     setAuth("Unsuccessfully Authenticated")
            }
        })
    }

    const login = (username, password) => {
        if(username) {
            axios({
                method: 'POST',
                data: {
                    username: username,
                    password: password
                },
                withCredentials: true,
                url: 'http://localhost:3001/admin/login'
            })
            .then((res) => {
                console.log("I am coming from the server " + res.data)
                if(res.data === 'Successfully Authenticated') {
                    set_auth(res.data)
                } else {
                    set_auth(res.data)
                }
            })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        // setLoginUsername(username)
        // setLoginPassword(password)

        login(username, password)

        event.target.reset()
    }

    useEffect(() => {
        console.log("admin useEffect running...")
        dispatch(authenticate())
        // login()
    }, [])
    
    return (
        <>
        <Header />
        <Container className="image-container mt-5">
            <Row>
                <Col>
                    <img className="admin-icon" src="images/admin-icon.png" alt="admin icon" />
                </Col>
            </Row>
        </Container>

        <Container className="login-container" >
            <Row className="login-row">
                <Col>
                    <h1 className="login-header">Admin Login</h1>                
                </Col>
            </Row>

            <Row>
                <Form className="input-lg" onSubmit={onSubmit}>
                    <Form.Group className="mb-5 input-field">
                        <Form.Control style={{fontSize : "40px" }} required id="username" name="username" placeholder="Username..." />
                    </Form.Group>

                    <Form.Group className="mb-5 input-field">
                        <Form.Control style={{fontSize : "40px" }} required id="password" name="password" type="password" placeholder="Password..." />
                    </Form.Group>

                    <Button style={{fontSize : "40px", borderRadius: "10px", width: "20rem" }} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
        { auth === "Successfully Authenticated" &&
                <Redirect to={{ pathname: "/user" }} />
        }
        {
            auth === "Unsuccessfully Authenticated" &&
                <p className="login-message">Unsuccesfully Authenticated</p>
        }
        {
            auth === "Server Offline" &&
                <p className="login-message">Server is offline, please reconnect to server before logging in</p>
        }
        </>
    )
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

// export default Admin
export default connect(matchStateToProps, mapDispatchToProps)(Admin);
