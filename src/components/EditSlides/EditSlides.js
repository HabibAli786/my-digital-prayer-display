import axios from "axios";
import { useEffect, useState, useMemo } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Redirect } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header/Header'
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";
import './EditSlides.css'

function EditSlides(props) {

    const dispatch = useDispatch()
    const { auth } = props

    const [slides, setSlides] = useState([])

    const getSlides = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/media/slides'
        }).then((res) => {
            // console.log(res.data)
            const data = res.data.files
            console.log(data)
            if(data.length >= 1) {
                setSlides(data)
            }
        })
    }


    useEffect(() => {
        dispatch(authenticate())
        getSlides()
    }, [slides.length])
    
    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "60px"}}>Edit Slides</h1>
            <Container className="edit-slides-container">
                <Row className="slides-header-row">
                        <h1 style={{textAlign: "left", fontSize: "45px"}}>List of Slides</h1>
                </Row>
                <div style={{overflowY: "scroll", overflowX: "hidden", height: "500px"}}>
                    {slides ? slides.map(
                        slide => 
                        <Row key={uuidv4()} className="slides-row">
                            <Col lg={2}>
                                <img style={{width : "100%", height: "100%"}} src={`http://localhost:3001/media/slides/${slides.indexOf(slide)+1}`} alt="Slide"/>
                            </Col>
                            <Col className="slides" lg={7}>
                                <Card body>{slide}</Card>
                            </Col>
                            <Col lg={2}>
                                <Button variant="danger" className="slides-button" onClick={() => console.log(slide)}>Delete</Button>
                            </Col>
                        </Row>
                    ) :
                    <Row className="slides-row">
                        <Col lg={2}>
                            <img style={{width : "100%", height: "100%"}} src="" alt="Slide"/>
                        </Col>
                        <Col className="slides" lg={7}>
                            <Card body>No Slide Currently</Card>
                        </Col>
                        <Col lg={2}>
                                <Button variant="danger" className="slides-button" onClick={() => console.log("I got clicked")}>Delete</Button>
                        </Col>
                    </Row>
                    }
                    
                </div>
                
                <Row className="new-slides-header-row">
                    <h1 style={{textAlign: "left", fontSize: "45px"}}>New Slides</h1>
                </Row>
                <Row className="slides-row">
                    <Col className="slides" lg={10}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control style={{fontSize: "45px"}} type="text" placeholder="Upload New Slides Here" />
                        </Form.Group>
                    </Form>
                    </Col>
                    <Col lg={2}>
                        <Button variant="primary" className="slides-button">Upload</Button>
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

export default connect(matchStateToProps, mapDispatchToProps)(EditSlides);