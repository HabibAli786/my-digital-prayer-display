import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import Switch from "react-switch";
import Header from "../Header/Header";
import { set_qrToggle } from "../Redux/actions/qrCodeAction";

import './QRCode.css'

function QRCode(props) {

    const { qr_toggle, set_qrToggle, auth } = props

    const [checked, setChecked] = useState(false)

    const handleChange = (nextChecked) => {
        setChecked(nextChecked)
        set_qrToggle(nextChecked)
    }

    const [file, setFile] = useState(null)
    const [serverStatus, setServerStatus] = useState(null)

    const uploadFile = (e) => {
        e.preventDefault()
        let source = axios.CancelToken.source();
        const data = new FormData()
        data.append('logo', file)
        // console.log(e.target.value)
        console.log(file)
        console.log(data)
        if(file) {
            axios.post('http://localhost:3001/media/logo', data, {
                'content-type': 'multipart/form-data',
                cancelToken: source.token
            }).then(res => { // then print response status
                // console.log(res);
                setServerStatus(res.data)
                source.cancel('Cancelling in cleanup')
            })
        } else {
            setServerStatus("Error: No file has been selected")
        }
        e.target.logo.value = ""
    }

    useEffect(() => {
        handleChange(qr_toggle)
    })

    if(auth === "Unsuccessfully Authenticated" || auth === "Server Offline" || !auth ) {
        return ( <Redirect to="/admin" /> )
    } else {
        return (
            <>
            <Header />
            <h1 className="qr-code-title">QR Code Settings</h1>
            <Container className="qr-code-container">
                <Row>
                    <Col>
                        <Switch onChange={handleChange} checked={checked} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="qr-code-status-header">QR Code Status: {checked ? "On" : "Off"}</h1>
                    </Col>
                </Row>
                <Row className="uploadQR-row">
                    <Col>
                        <AiOutlineCloudUpload className="qr-code-logo" />
                        <Form onSubmit={uploadFile}>
                            <input 
                                className="uploadQR-inputImage" 
                                name="logo"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0]) } />
                            <br />
                            <Button className="qr-code-button" type="submit">Upload QR Code</Button>
                        </Form>
                    </Col>
                    </Row>
            </Container>
            </>
        )
    }

}

const matchStateToProps = state => ({
    qr_toggle : state.qrCode.qr_toggle,
    auth : state.admin.auth,
})
  
const mapDispatchToProps = (dispatch) => {
    return {
        set_qrToggle : (qr_toggle) => dispatch(set_qrToggle(qr_toggle)),
    }
}   

export default connect(matchStateToProps, mapDispatchToProps)(QRCode);