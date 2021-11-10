import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { AiOutlineCloudUpload } from "react-icons/ai";

import Header from '../Header/Header'
import './UploadTimetable.css'
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";

function UploadTimetable(props) {

    const { auth } = props

    const [file, setFile] = useState(null)
    const [serverStatus, setServerStatus] = useState(null)


    const uploadFile = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('prayertimes', file)
        // console.log(e.target.value)
        console.log(file)
        if(file) {
            axios.post('http://localhost:3001/media/uploadTimetable', data, {
                'content-type': 'multipart/form-data'
            }).then(res => { // then print response status
                console.log(res);
                setServerStatus(res.data)
            })
        } else {
            setServerStatus("Error: No file has been selected")
        }
        e.target.prayertimes.value = ""
    }

    useEffect(() => {
        console.log("UploadTimetable useEffect running")
        authenticate()
    }, [file, serverStatus])

    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "50px"}}>UploadTimetable</h1>
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
                                style={{ marginTop : "100px", fontSize: "30px", borderStyle: "solid" }} 
                                name="prayertimes"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0]) } />
                            <br />
                            <Button type="submit" style={{ marginTop : "15px" }}>Upload Timetable</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            { serverStatus === "File has been uploaded successfully" &&
                <p className="server_status_success">Server Status: {serverStatus}</p>
            }
            { serverStatus !== null && serverStatus !== "File has been uploaded successfully" &&
                <p className="server_status_unsuccessful">Server Status: {serverStatus}</p>
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