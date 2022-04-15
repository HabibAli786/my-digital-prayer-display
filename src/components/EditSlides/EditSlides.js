import axios from "axios";
import { useEffect, useState } from "react"
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
    const [slideToUpload, setSlideToUpload] = useState(null)
    const [error, setError] = useState(null)

    const getSlides = () => {
        // console.log("getSlides is running")
        let source = axios.CancelToken.source();
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:3001/media/slides',
            cancelToken: source.token
        }).then((res) => {
            // console.log(res.data)
            const data = res.data.files
            // console.log(data)
            if(data.length >= 1) {
                setSlides(data)
            } else {
                setSlides([])
            }
            source.cancel("Cancelling in cleanup");
        })
    }

    const deleteSlide = (slide) => {
        let source = axios.CancelToken.source();
        axios({
            method: 'POST',
            data: {
                slideToDelete : slide
            },
            withCredentials: true,
            url: 'http://localhost:3001/media/slides/admin/delete',
            cancelToken: source.token
        })
        .then((res) => {
            // console.log(res.data)
            getSlides()
            source.cancel("Cancelling in cleanup");
        })
    }

    const uploadSlide = (e) => {
        let source = axios.CancelToken.source();
        e.preventDefault()
        const data = new FormData()
        data.append('slide', slideToUpload)
        // console.log(data)
        // console.log(e.target.value)
        // console.log(slideToUpload)
        if(slideToUpload) {
            axios.post('http://localhost:3001/media/slides/admin/add', data, {
                'content-type': 'multipart/form-data',
                cancelToken: source.token
            }).then(res => {
                // console.log(res);
                if(res.data !== "File has been uploaded successfully") {
                    setError(res.data)
                }
                getSlides()
                source.cancel("Cancelling in cleanup");
                // setServerStatus(res.data)
            })
        } else {
            // setServerStatus("Error: No file has been selected")
        }
        e.target.slide.value = ""
    } 


    useEffect(() => {
        // dispatch(authenticate())
        getSlides()

        return () => {

        }
    }, [slides.length])

    // console.log(slides.length)

    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 className="edit-slides-title">Edit Slides</h1>
            <Container className="edit-slides-container">
                <Row className="edit-slides-header-row">
                        <h1 className="edit-slides-header">List of Slides</h1>
                </Row>
                <div className="slides-container">
                    {slides.length > 0 && slides.map(
                        slide => 
                        <Row key={uuidv4()} className="slides-row">
                            <Col lg={2}>
                                <img className="slides-image" src={`http://localhost:3001/media/slides/${slide}`} alt="Slide"/>
                            </Col>
                            <Col className="slides" lg={7}>
                                <Card body>{slide}</Card>
                            </Col>
                            <Col lg={2}>
                                <Button variant="danger" className="slides-button" onClick={() => deleteSlide(slide)}>Delete</Button>
                            </Col>
                        </Row>
                    )}
                    {slides.length <= 0 &&
                    <Row className="slides-row">
                        <Col className="slides" lg={10}>
                            <Card body>No Slide Currently Available</Card>
                        </Col>
                    </Row>
                    }
                    
                </div>
                
                <Row className="new-slides-header-row">
                    <h1 className="new-slides-header">New Slides</h1>
                </Row>
                <Row className="slides-row">
                    <Col className="slides" lg={12}>
                    <Form onSubmit={uploadSlide}>
                        <Form.Group className="mb-3">
                            <input 
                                name="slide" 
                                className="new-slides-input" 
                                type="file" 
                                onChange={(e) => setSlideToUpload(e.target.files[0]) } />
                            <Button type="submit" variant="primary" className="slides-submit-button">Upload</Button>
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
                {error &&
                    <Row className="slides-error-row">
                        <h1 className="slides-error">{error}</h1>
                    </Row>
                }
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