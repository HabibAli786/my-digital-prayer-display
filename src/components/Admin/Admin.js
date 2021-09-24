import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../Header/Header'

import './Admin.css'

function Admin() {

    return (
        <>
        <Header />
        <div className="main-content">

            <Container className="main-container">
                <Row>
                    <Col>
                        <img className="admin-icon" src="images/admin-icon.png" alt="admin icon" />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h1>Admin Login</h1>                
                    </Col>
                </Row>

                <Row>
                    <Form>
                        <Form.Group className="mb-3 input-field" controlId="formBasicEmail">
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control placeholder="Username..." />
                            {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3 input field" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password..." />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Row>

            </Container>

        </div>
        </>
    )

}

export default Admin