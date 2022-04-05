import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
// import { connect, useDispatch } from "react-redux";
import { Redirect } from 'react-router';
import { AiOutlineCloudUpload } from "react-icons/ai";

import Header from '../Header/Header'
import './UploadTimetable.css'
import { set_auth, set_username } from "../Redux/actions/authAction";
// import { authenticate } from "../Redux/reducers/authReducer";

function UploadTimetable(props) {
    
    // const dispatch = useDispatch()
    const { auth } = props

    const [file, setFile] = useState(null)
    const [serverStatus, setServerStatus] = useState(null)

    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const uploadFile = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('prayertimes', file)
        // console.log(e.target.value)
        // console.log(file)
        if(file) {
            axios.post('http://localhost:3001/media/uploadTimetable', data, {
                'content-type': 'multipart/form-data'
            }).then(res => { // then print response status
                // console.log(res);
                setServerStatus(res.data)
            })
        } else {
            setServerStatus("Error: No file has been selected")
        }
        e.target.prayertimes.value = ""
    }

    useEffect(() => {
        // console.log("UploadTimetable useEffect running")
        // dispatch(authenticate())
    }, [])

    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "50px"}}>Upload Timetable</h1>
            <Container className="uploadTimetable-container">
                <Row>
                    <Col>
                        <AiOutlineCloudUpload size={200} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={uploadFile}>
                            <input 
                                className="uploadTimetable-fileInput"
                                name="prayertimes"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0]) } />
                            <br />
                            <Button type="submit" style={{ marginTop : "15px" }}>Upload Timetable</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Button className="uploadTimetable-hint-button" variant="primary" onClick={handleShow}>
                Hint
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Timetable Upload Guide (CSV File)</Modal.Title>
                </Modal.Header>
                <Modal.Body>For the timetable to be succesfully uploaded, the rules below must be followed</Modal.Body>
                <Modal.Body>IMPORTANT: file was be saved with the name prayertimes.csv</Modal.Body>
                <Modal.Body>Headers should be - d_date, fajr_begins, fajr_jamaat, sunrise, zuhr_begins, 
                            zuhr_jamaat, asr_begins, asr_jamaat, maghrib_begins, maghrib_jamaat, isha_begins, 
                            isha_jamaat, hijri_date, hijri_month, hijri_year
                </Modal.Body>
                <Modal.Body>d_date should be in DD/MM/YYYY format</Modal.Body>
                <Modal.Body>Timings for each jamaat should be in 24-hour format</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            { serverStatus === "File has been uploaded successfully" &&
                <p className="uploadTimetable_server_status_success">Server Status: {serverStatus}</p>
            }
            { serverStatus !== null && serverStatus !== "File has been uploaded successfully" &&
                <p className="uploadTimetbale_server_status_unsuccessful">Server Status: {serverStatus}</p>
            }
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

export default connect(matchStateToProps, mapDispatchToProps)(UploadTimetable);