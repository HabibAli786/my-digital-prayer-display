import axios from "axios";
import { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Switch from "react-switch";
import Header from "../Header/Header";

import './QRCode.css'

function QRCode() {

    const [checked, setChecked] = useState({ checked: false })

    const handleChange = (nextChecked) => {
        setChecked(nextChecked)
    }

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


    return (
        <>
        <Header />
        <h1 style={{marginTop : "15px", fontSize: "50px"}}>QR Code Settings</h1>
        <Container className="qr-code-container">
            <Row>
                <Col>
                    <Switch onChange={handleChange} checked={checked} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>QR Code Status: {checked ? "On" : "Off"}</h1>
                </Col>
            </Row>
            <Row className="uploadQR-row">
                <Col>
                    <AiOutlineCloudUpload size={200} />
                    <Form onSubmit={uploadFile}>
                        <input 
                            className="uploadQR-inputImage" 
                            name="logo"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0]) } />
                        <br />
                        <Button type="submit" style={{ marginTop : "15px" }}>Upload QR Code</Button>
                    </Form>
                </Col>
                </Row>
        </Container>
        </>
    )

}

   

export default QRCode;