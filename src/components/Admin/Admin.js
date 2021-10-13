import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../Header/Header'

import './Admin.css'

function Admin() {

    const [loginUsername, setLoginUsername] = useState(false)
    const [loginPassword, setLoginPassword] = useState(false)
    const [auth, setAuth] = useState(null)
    const [userData, setuserData] = useState(null)
    
    const login = () => {

    }

    const getUser = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/admin/user'
        }).then((res) => {
            console.log(res)
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        setLoginUsername(event.target.username.value)
        setLoginPassword(event.target.password.value)

        axios({
            method: 'POST',
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: 'http://localhost:3001/admin/login'
        })
        .then((res) => {
            console.log(res.data)
            if(res.data === 'Successfully Authenticated') {
                setAuth(true)
            } else {
                setAuth(false)
            }
        })

        event.target.reset()
    }
    
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
        {
            auth === true ? <h1>You have been unsuccesfull</h1> : <h1>Hello User</h1>
        }
        <Button onClick={getUser}>Get user data</Button>
        </>
    )
}

export default Admin