import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../Header/Header'

import './Admin.css'

function Admin() {

    return (
        <>
        <Header />
        {/* <div className="main-content-admin"> */}

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
                    <Form className="input-lg">
                        <Form.Group className="mb-5 input-field">
                            <Form.Control style={{fontSize : "40px" }} placeholder="Username..." />
                        </Form.Group>

                        <Form.Group className="mb-5 input-field" controlId="formBasicPassword">
                            <Form.Control style={{fontSize : "40px" }} type="password" placeholder="Password..." />
                        </Form.Group>

                        <Button style={{fontSize : "40px", borderRadius: "10px", width: "20rem" }} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>

        {/* </div> */}
        </>
    )

}

export default Admin