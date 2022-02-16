import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { connect, useDispatch } from "react-redux";
import { Redirect } from 'react-router';

import Header from '../Header/Header'
import { set_auth, set_username } from "../Redux/actions/authAction";
import { authenticate } from "../Redux/reducers/authReducer";
import './UploadLogo.css'

function UploadLogo(props) {

    const dispatch = useDispatch()
    const { auth } = props

    const [file, setFile] = useState(null)
    const [serverStatus, setServerStatus] = useState(null)


    const uploadFile = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('logo', file)
        // console.log(e.target.value)
        console.log(file)
        console.log(data)
        if(file) {
            axios.post('http://localhost:3001/media/logo', data, {
                'content-type': 'multipart/form-data'
            }).then(res => { // then print response status
                console.log(res);
                setServerStatus(res.data)
            })
        } else {
            setServerStatus("Error: No file has been selected")
        }
        e.target.logo.value = ""
    }

    useEffect(() => {
        console.log("UploadLogo useEffect running")
        dispatch(authenticate())
    }, [file, serverStatus])

    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 style={{marginTop : "15px", fontSize: "50px"}}>Upload Logo</h1>
            <Container className="uploadLogo-container">
                <Row>
                    <Col>
                        <AiOutlineCloudUpload size={200} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={uploadFile}>
                            <input 
                                className="uploadLogo-inputImage" 
                                name="logo"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0]) } />
                            <br />
                            <Button type="submit" style={{ marginTop : "15px" }}>Upload Logo</Button>
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

export default connect(matchStateToProps, mapDispatchToProps)(UploadLogo);